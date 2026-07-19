const brevo = require("../config/email");
const { BrevoError } = require("@getbrevo/brevo");

async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) {
    throw new Error("Recipient (to) and subject are required to send an email");
  }

  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      subject,
      textContent: text,
      htmlContent: html,
      sender: {
        name: "StudyMate",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
    });

    console.log("Email sent:", response.messageId || response);

    return response;
  } catch (err) {
    if (err instanceof BrevoError) {
      console.log(`Brevo API Error ${err.statusCode}:`, err.message);
    }
    throw err;
  }
}

module.exports = sendEmail;