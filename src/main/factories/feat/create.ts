import { AdminValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { CreateFeatController } from '../../../presentation/controllers/feat/create'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { AddFeatMongoRepository } from '../../../infra/db/mongodb/feat/add-feat'
import { DbAddFeat } from '../../../data/usecases/feat/db-add-feat'

export const makeCreateFeatController = (): CreateFeatController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const addFeatMongoRepository = new AddFeatMongoRepository()
  const dbAddFeat = new DbAddFeat(addFeatMongoRepository)
  const controller = new CreateFeatController(adminValidatorAdapter, dbAddFeat)
  return controller
}
