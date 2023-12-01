import { FirstAccessEmailSender } from '../../presentation/protocols/user/first-access-email-sender'
import nodemailer from 'nodemailer'
import env from '../../main/config/env'

export class FirstAccessEmailSenderAdapter implements FirstAccessEmailSender {
  async sendMail (email: string, firstAccessToken: string): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: env.mailHost,
      port: env.mailPort,
      auth: {
        user: env.mailUser,
        pass: env.mailPass
      }
    })

    const response = await transporter.sendMail({
      from: 'DiceCanvas" <contact@dicecanvas.com>',
      to: email,
      subject: 'Account Verification DiceCanvas',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h1 style="color: #007bff;">ExitLag Routes Viewer</h1>
          <p style="font-size: 18px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Use the following link to complete your Registration. The link is valid for 48 hours.</p>
          <p style="font-size: 16px;">
              <a href="https://dicecanvas.com/auth/verify-account?first-access-token=${firstAccessToken}&email=${email}" style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verify Your Account</a>
          </p>
          <p style="font-size: 16px; color: #333;">Thank you for registering for DiceCanvas!</p>
      </div>
  `
    })

    return response
  }
}
