const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter
  .verify()
  .then(() => console.log("✅ Email service ready"))
  .catch((err) => console.error("❌ Email service error:", err));

// Send contact form email
const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Email to you (the portfolio owner)
  const mailOptionsToOwner = {
    from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: `Portfolio Contact: ${subject}`,
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h2 style="color: white; margin: 0;">📬 New Contact Message</h2>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #495057;">From:</td>
                            <td style="padding: 10px; color: #212529;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #495057;">Email:</td>
                            <td style="padding: 10px; color: #212529;">
                                <a href="mailto:${email}" style="color: #667eea;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #495057;">Subject:</td>
                            <td style="padding: 10px; color: #212529;">${subject}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: #495057;">Date:</td>
                            <td style="padding: 10px; color: #212529;">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px; border-left: 4px solid #667eea;">
                        <h3 style="color: #495057; margin-top: 0;">Message:</h3>
                        <p style="color: #212529; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <a href="mailto:${email}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Reply to ${name}
                        </a>
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 12px;">
                    <p>This message was sent from your portfolio contact form.</p>
                </div>
            </div>
        `,
  };

  // Auto-reply email to the sender
  const mailOptionsToSender = {
    from: `"Denis Syengo" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Thank you for contacting me!",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h2 style="color: white; margin: 0;">👋 Hi ${name}!</h2>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px;">
                    <p style="color: #212529; font-size: 16px; line-height: 1.6;">
                        Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.
                    </p>
                    
                    <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 10px; border-left: 4px solid #667eea;">
                        <p style="color: #495057; font-size: 14px;"><strong>Your message:</strong></p>
                        <p style="color: #6c757d; font-size: 14px; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? "..." : ""}"</p>
                    </div>
                    
                    <p style="color: #212529; font-size: 16px; line-height: 1.6;">
                        In the meantime, feel free to:
                    </p>
                    
                    <ul style="color: #212529; font-size: 14px;">
                        <li>Check out my <a href="https://github.com/dsyengp" style="color: #667eea;">GitHub</a></li>
                        <li>Connect on <a href="https://www.linkedin.com/in/dsyengo" style="color: #667eea;">LinkedIn</a></li>
                    </ul>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                        <p style="color: #495057; font-size: 16px;">
                            Best regards,<br>
                            <strong>Denis Syengo</strong><br>
                            <span style="color: #6c757d;">Full-Stack Developer & DevOps Engineer</span>
                        </p>
                    </div>
                </div>
            </div>
        `,
  };

  // Send both emails
  await transporter.sendMail(mailOptionsToOwner);
  await transporter.sendMail(mailOptionsToSender);

  return true;
};

module.exports = { sendContactEmail };
