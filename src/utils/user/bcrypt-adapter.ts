import { Encrypter } from '../../presentation/protocols/user/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  async hash (password: string): Promise<string> {
    return bcrypt.hash(password, this.salt)
  }
}
