import nodemailer from 'nodemailer'
import { ForgotPasswordEmailSender } from '../../presentation/protocols/user/forgot-password-email-sender'
import env from '../../main/config/env'

export class ForgotPasswordEmailSenderAdapter implements ForgotPasswordEmailSender {
  async sendMail (email: string, forgotPasswordToken: string): Promise<any> {
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
      subject: 'Change Password Route Viewer',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h1 style="color: #007bff;">DiceCanvas</h1>
          <p style="font-size: 18px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Use the following link to reset your password. The link is valid for 48 hours.</p>
          <p style="font-size: 16px;">
              <a href="https://routesviewer.com/auth/change-password?password-reset-token=${forgotPasswordToken}&email=${email}" style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verify Your Account</a>
          </p>
          <p style="font-size: 16px; color: #333;">Thank you for using for DiceCanvas!</p>
      </div>
      `
    })

    return response
  }
}
