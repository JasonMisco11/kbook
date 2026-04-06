import { NextRequest, NextResponse } from 'next/server'

// POST /api/upload — handle photo uploads to Supabase storage
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // TODO: Upload to Supabase Storage
  console.log('Uploading file:', file.name, file.size, 'bytes')

  return NextResponse.json({
    success: true,
    url: `/images/${file.name}`, // placeholder URL
  })
}
