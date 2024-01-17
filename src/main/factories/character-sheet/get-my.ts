import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetAllMyCharacterSheetController } from '../../../presentation/controllers/character-sheet/get-all-my-character-sheet'
import { GetAllMyCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/get-all-my-character-sheet'
import { DbGetAllMyCharacterSheet } from '../../../data/usecases/character-sheet/db-get-all-my-character-sheet'

export const makeGetAllMyCharacterSheetController = (): GetAllMyCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getAllMyCharacterSheetMongoRepository = new GetAllMyCharacterSheetMongoRepository()
  const dbGetAllMyCharacterSheet = new DbGetAllMyCharacterSheet(getAllMyCharacterSheetMongoRepository)
  const controller = new GetAllMyCharacterSheetController(authenticatedValidatorAdapter, userDecoderAdapter, dbGetAllMyCharacterSheet)
  return controller
}
