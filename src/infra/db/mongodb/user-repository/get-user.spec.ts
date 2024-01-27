import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserMongoRepository } from './add-user'
import { GetUserMongoRepository } from './get-user'

describe('Get User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://127.0.0.1:27017/test')
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a user on success using getById', async () => {
    const addUser = new AddUserMongoRepository()
    const newUser = await addUser.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
      firstAccessToken: 'any_token',
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })

    const sut = new GetUserMongoRepository()
    const user = await sut.getById(newUser._id)
    expect(user).toBeTruthy()
  })

  test('Should return a user on success using getByEmail', async () => {
    const addUser = new AddUserMongoRepository()
    const newUser = await addUser.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      role: 'any_role',
      firstAccessToken: 'any_token',
      userSettings: {
        autoScroll: true
      },
      createdAt: new Date()
    })

    const sut = new GetUserMongoRepository()
    const user = await sut.getByEmail(newUser.email)
    expect(user).toBeTruthy()
  })
})
