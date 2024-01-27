import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserMongoRepository } from './add-user'
import { UpdateUserMongoRepository } from './update-user'

describe('Update User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://127.0.0.1:27017/test')
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a updated user on success', async () => {
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

    const sut = new UpdateUserMongoRepository()
    newUser.name = 'new_name'
    newUser.role = 'new_role'
    newUser.userSettings = {
      autoScroll: false
    }

    const user = await sut.update(newUser)
    expect(user).toBeTruthy()
    expect(user.name).toBe('new_name')
    expect(user.role).toBe('new_role')
    expect(user.userSettings.autoScroll).toBe(false)
  })
})
