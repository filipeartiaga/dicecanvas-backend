import { LogModel } from '../../../../domain/models/log/log'
import { AddLogModel } from '../../../../domain/usescases/log/add-log'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddLogMongoRepository implements AddLogMongoRepository {
  async add (logData: AddLogModel): Promise<LogModel> {
    const logCollection = await MongoHelper.getCollection('logs')
    const result = await logCollection.insertOne(logData)
    return result.ops[0]
  }
}
