import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { UpdateInitiativeController } from '../../../presentation/controllers/initiative/update'
import { GetInitiativeMongoRepository } from '../../../infra/db/mongodb/initiative/get-initiative'
import { DbGetInitiative } from '../../../data/usecases/initiative/db-get-initiative'
import { UpdateInitiativeMongoRepository } from '../../../infra/db/mongodb/initiative/update-initiative'
import { DbUpdateInitiative } from '../../../data/usecases/initiative/db-update-initiative'

export const makeUpdateInitiativeController = (): UpdateInitiativeController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getInitiativeMongoRepository = new GetInitiativeMongoRepository()
  const dbGetInitiative = new DbGetInitiative(getInitiativeMongoRepository)
  const updateInitiativeMongoRepository = new UpdateInitiativeMongoRepository()
  const dbUpdateInitiative = new DbUpdateInitiative(updateInitiativeMongoRepository)
  const controller = new UpdateInitiativeController(authenticatedValidatorAdapter, dbGetInitiative, dbUpdateInitiative)
  return controller
}
