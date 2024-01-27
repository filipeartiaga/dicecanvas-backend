import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserMongoRepository } from './add-user'

describe('Add User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://127.0.0.1:27017/test')
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a user account on success', async () => {
    const sut = new AddUserMongoRepository()
    const user = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
      firstAccessToken: 'any_token',
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })

    console.log(user)

    expect(user).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.email).toBe('any_email@mail.com')
    expect(user.role).toBe('any_role')
    expect(user.firstAccessToken).toBe('any_token')
    expect(user.userSettings).toBeTruthy()
  })
})
