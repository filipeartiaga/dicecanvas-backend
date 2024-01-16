import { MongoHelper } from '../helpers/mongo-helper'

export class ClearLogMongoRepository implements ClearLogMongoRepository {
  async clear (): Promise<any> {
    const logCollection = MongoHelper.getCollection('logs')
    // clear all logs
    const response = await logCollection.deleteMany({})
    return response
  }
}
