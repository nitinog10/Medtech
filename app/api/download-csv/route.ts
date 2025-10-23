import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const csvFile = path.join(dataDir, 'form-submissions.csv')

    // Check if file exists
    try {
      await fs.access(csvFile)
    } catch {
      return NextResponse.json(
        { error: 'CSV file not found' },
        { status: 404 }
      )
    }

    // Read the CSV file
    const fileContent = await fs.readFile(csvFile, 'utf-8')

    // Return the file as a download
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="hospital-form-submissions.csv"',
      },
    })
  } catch (error) {
    console.error('Error downloading CSV file:', error)
    return NextResponse.json(
      { error: 'Failed to download CSV file' },
      { status: 500 }
    )
  }
}