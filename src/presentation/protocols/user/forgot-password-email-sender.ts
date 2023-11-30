export interface ForgotPasswordEmailSender {
  sendMail (email: string, forgotPasswordToken: string): Promise<any>
}
