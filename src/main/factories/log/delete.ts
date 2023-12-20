import { AdminValidatorAdapter, AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { DeleteLogController } from '../../../presentation/controllers/log/delete'
import { GetLogMongoRepository } from '../../../infra/db/mongodb/log/get-log'
import { DbGetLog } from '../../../data/usecases/log/db-get-log'
import { DeleteLogMongoRepository } from '../../../infra/db/mongodb/log/delete-logs'
import { DbDeleteLog } from '../../../data/usecases/log/db-delete-log'

export const makeDeleteLogController = (): DeleteLogController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getLogMongoRepository = new GetLogMongoRepository()
  const dbGetLog = new DbGetLog(getLogMongoRepository)
  const deleteLogMongoRepository = new DeleteLogMongoRepository()
  const dbDeleteLog = new DbDeleteLog(deleteLogMongoRepository)
  const controller = new DeleteLogController(authenticatedValidatorAdapter, adminValidatorAdapter, userDecoderAdapter, dbGetLog, dbDeleteLog)
  return controller
}
