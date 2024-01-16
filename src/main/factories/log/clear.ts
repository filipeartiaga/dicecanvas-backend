import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { ClearLogController } from '../../../presentation/controllers/log/clear'
import { ClearLogMongoRepository } from '../../../infra/db/mongodb/log/clear-log'
import { DbClearLog } from '../../../data/usecases/log/db-clear-log'

export const makeClearLogController = (): ClearLogController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const clearLogMongoRepository = new ClearLogMongoRepository()
  const dbClearLog = new DbClearLog(clearLogMongoRepository)
  const controller = new ClearLogController(authenticatedValidatorAdapter, dbClearLog)
  return controller
}
