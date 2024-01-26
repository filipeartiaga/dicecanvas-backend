import { UserModel } from '../../../domain/models/user/user'
import { AddUserModel } from '../../../domain/usescases/user/add-user'
import { AddUserRepository } from '../../protocols/user/add-user-repository'
import { DbAddUser } from './db-add-user'

describe('DbAddUser Usecase', () => {
  const mockedDate = new Date(2000, 9, 1, 7)
  jest.spyOn(global, 'Date').mockImplementation(() => {
    return mockedDate
  })

  interface SutTypes {
    sut: DbAddUser
    AddUserRepositoryStub: AddUserRepository
  }

  const makeAddUserRepository = (): AddUserRepository => {
    class AddUserRepositoryStub implements AddUserRepository {
      async add (userData: AddUserModel): Promise<UserModel> {
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
    return new AddUserRepositoryStub()
  }

  const makeSut = (): SutTypes => {
    const AddUserRepositoryStub = makeAddUserRepository()
    const sut = new DbAddUser(AddUserRepositoryStub)
    return {
      sut,
      AddUserRepositoryStub
    }
  }

  test('Should call AddUserRepository with correct values ', async () => {
    const { sut, AddUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(AddUserRepositoryStub, 'add')
    const userData = {
      name: 'valid_name',
      email: 'valid_email',
      role: 'valid_role',
      userSettings: {
        autoScroll: true
      },
      firstAccessToken: 'valid_token',
      createdAt: new Date()
    }
    await sut.add(userData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      role: 'valid_role',
      firstAccessToken: 'valid_token',
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })
  })

  test('Should throw if AddUserRepository throws ', async () => {
    const { sut, AddUserRepositoryStub } = makeSut()
    jest.spyOn(AddUserRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const userData = {
      name: 'valid_name',
      email: 'valid_email',
      role: 'valid_role',
      userSettings: {
        autoScroll: true
      },
      firstAccessToken: 'valid_token',
      createdAt: new Date()
    }
    const promise = sut.add(userData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success ', async () => {
    const { sut } = makeSut()
    const userData = {
      name: 'valid_name',
      email: 'valid_email',
      role: 'valid_role',
      userSettings: {
        autoScroll: true
      },
      firstAccessToken: 'valid_token',
      createdAt: new Date()
    }
    const user = await sut.add(userData)
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
