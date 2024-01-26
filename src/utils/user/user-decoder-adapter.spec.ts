import { UserModel } from '../../domain/models/user/user'
import { UserDecoderAdapter } from './user-decoder-adapter'
import { UserSignerAdapter } from './user-signer-adapter'

describe('User Decoder Adapter', () => {
  const makeFakeUser = (): UserModel => ({
    _id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'valid_role',
    password: 'valid_password',
    isVerified: true,
    passwordResetToken: 'valid_token',
    passwordResetExpires: new Date(),
    firstAccessToken: 'valid_token',
    userSettings: {
      autoScroll: true
    },
    createdAt: new Date()
  })

  test('Should return email on success', async () => {
    const secret = 'secret'
    const accessToken = new UserSignerAdapter(secret).sign(makeFakeUser())
    const sut = new UserDecoderAdapter(secret)
    const decoded = sut.decode(accessToken)
    expect(decoded).toBeTruthy()
    expect(decoded).toBe('valid_id')
  })
})
