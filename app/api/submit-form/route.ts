import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { google } from 'googleapis'

interface FormData {
  fullName: string
  email: string
  mobileNumber: string
  collegeName: string
  collegeYear: string
  branch: string
  collegeCity: string
  collegeState: string
}

// Google Sheets configuration
const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID || ''
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || ''
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''

async function saveToLocalFile(data: FormData) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    
    // Ensure data directory exists
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }

    // Save as JSON
    const jsonFile = path.join(dataDir, 'form-submissions.json')
    let submissions = []
    
    try {
      const existingData = await fs.readFile(jsonFile, 'utf-8')
      submissions = JSON.parse(existingData)
    } catch {
      // File doesn't exist or is empty, start with empty array
    }

    const newSubmission = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }

    submissions.push(newSubmission)
    await fs.writeFile(jsonFile, JSON.stringify(submissions, null, 2))

    // Save as CSV
    const csvFile = path.join(dataDir, 'form-submissions.csv')
    const csvHeaders = 'ID,Timestamp,Full Name,Email,Mobile Number,College Name,College Year,Branch,College City,College State\n'
    const csvRow = `${newSubmission.id},"${newSubmission.timestamp}","${data.fullName}","${data.email}","${data.mobileNumber}","${data.collegeName}","${data.collegeYear}","${data.branch}","${data.collegeCity}","${data.collegeState}"\n`
    
    try {
      await fs.access(csvFile)
      // File exists, append
      await fs.appendFile(csvFile, csvRow)
    } catch {
      // File doesn't exist, create with headers
      await fs.writeFile(csvFile, csvHeaders + csvRow)
    }

    return true
  } catch (error) {
    console.error('Error saving to local file:', error)
    return false
  }
}

async function saveToGoogleSheets(data: FormData) {
  if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.log('Google Sheets credentials not configured, skipping...')
    return true // Don't fail if not configured
  }

  try {
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({ version: 'v4', auth })

    // Check if sheet exists and has headers
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: 'Sheet1!A1:H1',
      })

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEETS_ID,
          range: 'Sheet1!A1:H1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Timestamp', 'Full Name', 'Email', 'Mobile Number', 'College Name', 'College Year', 'Branch', 'College City', 'College State', 'ID']]
          }
        })
      }
    } catch (error) {
      console.error('Error checking/creating headers:', error)
    }

    // Add the new row
    const timestamp = new Date().toISOString()
    const id = Date.now().toString()
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, data.fullName, data.email, data.mobileNumber, data.collegeName, data.collegeYear, data.branch, data.collegeCity, data.collegeState, id]]
      }
    })

    return true
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.mobileNumber || !data.collegeName || !data.collegeYear || !data.branch || !data.collegeCity || !data.collegeState) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Save to local file
    const localSaveSuccess = await saveToLocalFile(data)
    
    // Save to Google Sheets
    const sheetsSaveSuccess = await saveToGoogleSheets(data)

    if (localSaveSuccess) {
      return NextResponse.json(
        { 
          message: 'Form submitted successfully',
          localSave: localSaveSuccess,
          sheetsSave: sheetsSaveSuccess
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to save form data' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}