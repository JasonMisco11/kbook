import { NextRequest, NextResponse } from 'next/server'

// POST /api/notify — trigger email or WhatsApp alerts
export async function POST(request: NextRequest) {
  const body = await request.json()

  // TODO: Integrate with Resend for email and WhatsApp Business API
  console.log('Sending notification:', body)

  return NextResponse.json({ success: true, message: 'Notification sent' })
}
