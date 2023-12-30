import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { DeleteInitiativeController } from 'src/presentation/controllers/initiative/delete'
import { GetInitiativeMongoRepository } from 'src/infra/db/mongodb/initiative/get-initiative'
import { DbGetInitiative } from 'src/data/usecases/initiative/db-get-initiative'
import { DbDeleteInitiative } from 'src/data/usecases/initiative/db-delete-initiative'
import { DeleteInitiativeMongoRepository } from 'src/infra/db/mongodb/initiative/delete-initiative'

export const makeDeleteLogController = (): DeleteInitiativeController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getInitiativeMongoRepository = new GetInitiativeMongoRepository()
  const dbGetInitiative = new DbGetInitiative(getInitiativeMongoRepository)
  const deleteInitiativeMongoRepository = new DeleteInitiativeMongoRepository()
  const dbDeleteInitiative = new DbDeleteInitiative(deleteInitiativeMongoRepository)
  const controller = new DeleteInitiativeController(authenticatedValidatorAdapter, dbGetInitiative, dbDeleteInitiative)
  return controller
}
