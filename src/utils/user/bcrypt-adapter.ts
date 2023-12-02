import { Encrypter } from '../../presentation/protocols/user/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async hash (password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }
}
