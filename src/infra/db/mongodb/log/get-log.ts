import { LogModel } from '../../../../domain/models/log/log'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetLogMongoRepository implements GetLogMongoRepository {
  async getById (_id: string): Promise<LogModel[]> {
    const logCollection = MongoHelper.getCollection('logs')
    const userIdObjectId = new ObjectId(_id)
    const log = await logCollection.findOne({ _id: userIdObjectId })
    return log
  }
}
