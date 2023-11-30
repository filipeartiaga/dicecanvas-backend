export interface Encrypter {
  compare (password: string, hash: string): Promise<boolean>
  hash (password: string): Promise<string>
}
