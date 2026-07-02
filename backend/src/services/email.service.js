const transporter = require("../config/nodemailer");

async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject) {
    throw new Error("Recipient (to) and subject are required to send an email");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
  return info;
}

module.exports = sendEmail;