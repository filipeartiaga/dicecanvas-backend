import { LogModel } from '../../../../domain/models/log/log'
import { MongoHelper } from '../helpers/mongo-helper'

export class GetAllLogsMongoRepository implements GetAllLogsMongoRepository {
  async getAll (): Promise<LogModel[]> {
    const logCollection = MongoHelper.getCollection('logs')
    const logs = await logCollection.find().toArray()
    return logs
  }
}
