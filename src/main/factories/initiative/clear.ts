import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { ClearInitiativeController } from '../../../presentation/controllers/initiative/clear'
import { ClearInitiativeMongoRepository } from '../../../infra/db/mongodb/initiative/clear-initiative'
import { DbClearInitiative } from '../../../data/usecases/initiative/db-clear-initiative'

export const makeClearInitiativeController = (): ClearInitiativeController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const clearInitiativeMongoRepository = new ClearInitiativeMongoRepository()
  const dbClearInitiative = new DbClearInitiative(clearInitiativeMongoRepository)
  const controller = new ClearInitiativeController(authenticatedValidatorAdapter, dbClearInitiative)
  return controller
}
