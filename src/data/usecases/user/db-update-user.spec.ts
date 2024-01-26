import { UserModel } from '../../../domain/models/user/user'
import { UpdateUser } from '../../../domain/usescases/user/update-user'
import { UpdateUserRepository } from '../../protocols/user/update-user-repository'
import { DbUpdateUser } from './db-update-user'

describe('DbUpdateUser Usecase', () => {
  const mockedDate = new Date(2000, 9, 1, 7)
  jest.spyOn(global, 'Date').mockImplementation(() => {
    return mockedDate
  })

  interface ISutTypes {
    sut: UpdateUserRepository
  }

  const makeFakeUser = (): UserModel => ({
    _id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    role: 'valid_role',
    password: 'valid_password',
    isVerified: false,
    passwordResetToken: 'valid_token',
    passwordResetExpires: new Date(),
    firstAccessToken: 'valid_token',
    userSettings: {
      autoScroll: true
    },
    createdAt: new Date()
  })

  const makeUpdateUserRepository = (): UpdateUser => {
    class UpdateUserRepositoryStub implements UpdateUser {
      async update (user: UserModel): Promise<UserModel> {
        return await new Promise((resolve) => {
          resolve(makeFakeUser())
        })
      }
    }
    return new UpdateUserRepositoryStub()
  }

  const makeSut = (): ISutTypes => {
    const updateUserRepositoryStub = makeUpdateUserRepository()
    const sut = new DbUpdateUser(updateUserRepositoryStub)
    return {
      sut
    }
  }

  test('Should call UpdateUserRepository with correct values ', async () => {
    const { sut } = makeSut()
    const getSpy = jest.spyOn(sut, 'update')
    const fakeUser = makeFakeUser()
    await sut.update(fakeUser)
    expect(getSpy).toHaveBeenCalledWith(fakeUser)
  })

  test('Should throw if UpdateUserRepository throws ', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'update').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const fakeUser = makeFakeUser()
    const promise = sut.update(fakeUser)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a user on success ', async () => {
    const { sut } = makeSut()
    const fakeUser = makeFakeUser()
    const user = await sut.update(fakeUser)
    expect(user).toEqual({
      _id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      role: 'valid_role',
      password: 'valid_password',
      isVerified: false,
      passwordResetToken: 'valid_token',
      passwordResetExpires: new Date(),
      firstAccessToken: 'valid_token',
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })
  })
})
