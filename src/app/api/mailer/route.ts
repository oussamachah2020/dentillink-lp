import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
})

export async function POST(req: any, res: any) {
  const { to, userFullName } = await req.json()

  try {
    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to,
      subject: 'Application Registration',
      html: `
         <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://files.edgestore.dev/4y3x2o3yt0aicqmu/publicFiles/_public/ef6066e9-2dc3-4083-b872-2c0ec3b14720.png" alt="Dentiliik-Logo" style="max-width: 150px;" />
            </div>

            <h2 style="color: #2C3E50; font-size: 22px; font-weight: 700; margin-bottom: 24px; text-align: left; border-bottom: 2px solid #E5E5E5; padding-bottom: 10px;">
                Thank You for Your Interest in Dentiliik
            </h2>

            <p style="color: #333; font-size: 16px; margin-bottom: 20px; line-height: 1.6; text-align: left;">
                Dear ${userFullName},
            </p>
            
            <p style="color: #4D4D4D; font-size: 16px; margin-bottom: 24px; line-height: 1.6; text-align: left;">
                Thank you for signing up to receive updates about our upcoming application. We’re working hard to finalize Dentiliik and are excited to have you as one of the first to discover our solution.
            </p>

            <p style="color: #4D4D4D; font-size: 16px; margin-bottom: 24px; line-height: 1.6; text-align: left;">
                We’ll keep you informed about the latest news, features, and the launch date as soon as they’re available. In the meantime, feel free to visit our website to stay updated:
            </p>

            <p style="color: #4D4D4D; font-size: 14px; margin-top: 30px; line-height: 1.6; text-align: left;">
                We can’t wait to share Dentiliik with you and transform the way you work. Stay tuned!
            </p>
            
            <p style="color: #7A7A7A; font-size: 14px; margin-top: 20px; line-height: 1.5; text-align: left;">
                Best regards,<br>
                The Dentiliik Team
            </p>

            <p style="color: #A0A0A0; font-size: 12px; margin-top: 40px; text-align: center;">
                © Dentiliik. All rights reserved. | <a href="#" style="color: #A0A0A0; text-decoration: none;">Privacy Policy</a>
            </p>
            </div>
        `,
    })

    res.status(200).json({ message: 'Email sent successfully', info })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Error sending email, ' + error })
  }
}
