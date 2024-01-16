import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetAllFeatController } from '../../../presentation/controllers/feat/get-all'
import { DbGetAllFeat } from '../../../data/usecases/feat/db-get-all-feat'
import { GetAllFeatMongoRepository } from '../../../infra/db/mongodb/feat/get-all-feat'

export const makeGetAllFeatController = (): GetAllFeatController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getAllFeatMongoRepository = new GetAllFeatMongoRepository()
  const dbGetAllFeat = new DbGetAllFeat(getAllFeatMongoRepository)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const controller = new GetAllFeatController(authenticatedValidatorAdapter, dbGetAllFeat)
  return controller
}
