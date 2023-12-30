import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { CreateInitiativeController } from '../../../presentation/controllers/initiative/create'
import { AddInitiativeMongoRepository } from '../../../infra/db/mongodb/initiative/add-initiative'
import { DbAddInitiative } from '../../../data/usecases/initiative/db-add-initiative'

export const makeCreateInitiativeController = (): CreateInitiativeController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const addInitiativeMongoRepository = new AddInitiativeMongoRepository()
  const dbAddInitiative = new DbAddInitiative(addInitiativeMongoRepository)
  const controller = new CreateInitiativeController(authenticatedValidatorAdapter, dbAddInitiative)
  return controller
}
