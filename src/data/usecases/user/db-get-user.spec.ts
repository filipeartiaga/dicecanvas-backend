import { UserModel } from '../../../domain/models/user/user'
import { GetUserRepository } from '../../protocols/user/get-user-repository'
import { DbGetUser } from './db-get-user'

describe('DbGetUser Usecase', () => {
  const mockedDate = new Date(2000, 9, 1, 7)
  jest.spyOn(global, 'Date').mockImplementation(() => {
    return mockedDate
  })

  interface ISutTypes {
    sut: DbGetUser
    getUserRepositoryStub: GetUserRepository
  }

  const makeGetUserRepositoryStub = (): GetUserRepository => {
    class GetUserRepositoryStub implements GetUserRepository {
      async getById (email: string): Promise<UserModel> {
        const fakeUser = {
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
        }
        return await new Promise((resolve) => {
          resolve(fakeUser)
        })
      }

      async getByEmail (email: string): Promise<UserModel> {
        const fakeUser = {
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
        }
        return await new Promise((resolve) => {
          resolve(fakeUser)
        })
      }
    }
    return new GetUserRepositoryStub()
  }

  const makeSut = (): ISutTypes => {
    const getUserRepositoryStub = makeGetUserRepositoryStub()
    const sut = new DbGetUser(getUserRepositoryStub)
    return {
      sut,
      getUserRepositoryStub
    }
  }

  test('Should call GetUserRepository with correct values ', async () => {
    const { sut, getUserRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getUserRepositoryStub, 'getById')
    await sut.getById('valid_id')
    expect(getSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if GetUserRepository throws ', async () => {
    const { sut, getUserRepositoryStub } = makeSut()
    jest.spyOn(getUserRepositoryStub, 'getById').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.getById('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a user on success on getById method', async () => {
    const { sut } = makeSut()
    const user = await sut.getById('valid_id')
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

  test('Should return a user on success on getByEmail method', async () => {
    const { sut } = makeSut()
    const user = await sut.getByEmail('valid_email@mail.com')
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
