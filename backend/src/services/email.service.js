const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) {
    throw new Error("Recipient (to) and subject are required to send an email");
  }

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
    html,
  });

  console.log("Email sent:", response.data?.id);

  return response;
}

module.exports = sendEmail;