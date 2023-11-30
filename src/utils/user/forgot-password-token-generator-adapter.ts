import otpGenerator from 'otp-generator'
import { ForgotPasswordTokenGenerator } from '../../presentation/protocols/user/forgot-password-token-generator'

export class ForgotPasswordTokenGeneratorAdapter implements ForgotPasswordTokenGenerator {
  generate (length: number): string {
    const token = otpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false })
    return token
  }
}
