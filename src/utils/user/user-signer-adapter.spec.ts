import { UserModel } from '../../domain/models/user/user'
import { UserSignerAdapter } from './user-signer-adapter'

describe('User Signer Adapter', () => {
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

  test('Should return token on success', async () => {
    const fakeUser = makeFakeUser()
    const secret = 'secret'
    const sut = new UserSignerAdapter(secret)
    const accessToken = sut.sign(fakeUser)
    expect(accessToken).toBeTruthy()
  })
})
