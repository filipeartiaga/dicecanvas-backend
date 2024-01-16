import { AdminValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { DeleteFeatController } from '../../../presentation/controllers/feat/delete'
import { GetFeatMongoRepository } from '../../../infra/db/mongodb/feat/get-feat'
import { DbGetFeat } from '../../../data/usecases/feat/db-get-feat'
import { DeleteFeatMongoRepository } from '../../../infra/db/mongodb/feat/delete-feat'
import { DbDeleteFeat } from '../../../data/usecases/feat/db-delete-feat'

export const makeDeleteFeatController = (): DeleteFeatController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getFeatMongoRepository = new GetFeatMongoRepository()
  const dbGetFeat = new DbGetFeat(getFeatMongoRepository)
  const deleteFeatMongoRepository = new DeleteFeatMongoRepository()
  const dbDeleteFeat = new DbDeleteFeat(deleteFeatMongoRepository)
  const controller = new DeleteFeatController(adminValidatorAdapter, dbGetFeat, dbDeleteFeat)
  return controller
}
