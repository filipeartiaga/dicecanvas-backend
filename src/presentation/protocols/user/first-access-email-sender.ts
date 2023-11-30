export interface FirstAccessEmailSender {
  sendMail (email: string, firstAccessToken: string): Promise<any>
}
