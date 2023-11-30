export interface UserDecoder {
  secret: string
  decode (accessToken: string): string
}
