import { MongoHelper } from '../helpers/mongo-helper'

export class DeleteLogMongoRepository implements DeleteLogMongoRepository {
  async delete (_id: string): Promise<any> {
    const logsCollection = MongoHelper.getCollection('logs')
    const response = await logsCollection.delete({ _id })
    return response
  }
}
