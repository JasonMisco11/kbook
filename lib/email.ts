// Email helpers using Resend
// TODO: Install resend package: pnpm add resend

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  // TODO: Replace with actual Resend integration
  console.log(`Sending email to ${to}: ${subject}`)

  // const resend = new Resend(process.env.RESEND_API_KEY)
  // const { data, error } = await resend.emails.send({
  //   from: 'KwameServices <noreply@kwameservices.com>',
  //   to,
  //   subject,
  //   html,
  // })
  // return { data, error }

  return { data: null, error: null }
}

export async function sendJobConfirmation(email: string, jobRef: string) {
  return sendEmail({
    to: email,
    subject: `Job Confirmed — Ref: ${jobRef}`,
    html: `<h1>Your booking is confirmed!</h1><p>Reference: ${jobRef}</p>`,
  })
}

export async function sendJobAssignment(email: string, jobRef: string, plumberName: string) {
  return sendEmail({
    to: email,
    subject: `Job Assigned — ${jobRef}`,
    html: `<h1>New job assigned</h1><p>${plumberName}, you have been assigned job ${jobRef}.</p>`,
  })
}
