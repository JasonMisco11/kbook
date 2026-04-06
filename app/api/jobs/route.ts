import { NextRequest, NextResponse } from 'next/server'

// GET /api/jobs — list all jobs
export async function GET() {
  // TODO: Fetch jobs from Supabase
  return NextResponse.json({ jobs: [] })
}

// POST /api/jobs — create a new job
export async function POST(request: NextRequest) {
  const body = await request.json()

  // TODO: Insert job into Supabase
  console.log('Creating job:', body)

  return NextResponse.json({ success: true, job: body }, { status: 201 })
}

// PATCH /api/jobs — update a job
export async function PATCH(request: NextRequest) {
  const body = await request.json()

  // TODO: Update job in Supabase
  console.log('Updating job:', body)

  return NextResponse.json({ success: true, job: body })
}
