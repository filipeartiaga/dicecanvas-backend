import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetAllInitiativeController } from '../../../presentation/controllers/initiative/get-all'
import { GetAllInitiativesMongoRepository } from '../../../infra/db/mongodb/initiative/get-all-initiatives'
import { DbGetAllInitiative } from '../../../data/usecases/initiative/db-get-all-initiatives'

export const makeGetAllInitiativeController = (): GetAllInitiativeController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getAllInitiativeMongoRepository = new GetAllInitiativesMongoRepository()
  const dbGetAllInitiative = new DbGetAllInitiative(getAllInitiativeMongoRepository)
  const controller = new GetAllInitiativeController(authenticatedValidatorAdapter, dbGetAllInitiative)
  return controller
}
