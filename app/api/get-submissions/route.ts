import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const jsonFile = path.join(dataDir, 'form-submissions.json')

    // Check if file exists
    try {
      await fs.access(jsonFile)
    } catch {
      return NextResponse.json(
        { submissions: [] },
        { status: 200 }
      )
    }

    // Read the JSON file
    const fileContent = await fs.readFile(jsonFile, 'utf-8')
    const submissions = JSON.parse(fileContent)

    return NextResponse.json(
      { submissions: submissions.reverse() }, // Show newest first
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}