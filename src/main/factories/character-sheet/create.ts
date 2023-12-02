import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { CreateCharacterSheetController } from '../../../presentation/controllers/character-sheet/create'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { AddCharacterSheetMongoRepository } from '../../../infra/db/mongodb/status/add-character-sheet'
import { DbAddCharacterSheet } from '../../../data/usecases/character-sheet/db-add-character-sheet'

export const makeCreateCharacterSheetController = (): CreateCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const addCharacterSheetMongoRepository = new AddCharacterSheetMongoRepository()
  const dbAddCharacterSheet = new DbAddCharacterSheet(addCharacterSheetMongoRepository)
  const controller = new CreateCharacterSheetController(authenticatedValidatorAdapter, dbAddCharacterSheet, userDecoderAdapter)
  return controller
}
