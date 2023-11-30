export interface ForgotPasswordTokenGenerator {
  generate (length: number): string
}
