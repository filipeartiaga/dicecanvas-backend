import { AdminValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetFeatMongoRepository } from '../../../infra/db/mongodb/feat/get-feat'
import { DbGetFeat } from '../../../data/usecases/feat/db-get-feat'
import { EditFeatController } from '../../../presentation/controllers/feat/edit'
import { UpdateFeatMongoRepository } from '../../../infra/db/mongodb/feat/update-feat'
import { DbUpdateFeat } from '../../../data/usecases/feat/db-update-feat'

export const makeEditFeatController = (): EditFeatController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getFeatMongoRepository = new GetFeatMongoRepository()
  const dbGetFeat = new DbGetFeat(getFeatMongoRepository)
  const updateFeatMongoRepository = new UpdateFeatMongoRepository()
  const dbUpdateFeat = new DbUpdateFeat(updateFeatMongoRepository)
  const controller = new EditFeatController(adminValidatorAdapter, dbGetFeat, dbUpdateFeat)
  return controller
}
