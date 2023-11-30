import { FirstAccessTokenGenerator } from '../../presentation/protocols/user/first-access-token-generator'
import otpGenerator from 'otp-generator'

export class FirstAccessTokenGeneratorAdapter implements FirstAccessTokenGenerator {
  generate (length: number): string {
    const token = otpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false })
    return token
  }
}
