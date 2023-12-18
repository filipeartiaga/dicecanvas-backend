import { AdminValidatorAdapter, AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { DeleteCharacterSheetController } from '../../../presentation/controllers/character-sheet/delete'
import { GetCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/get-character-sheet'
import { DbGetCharacterSheet } from '../../../data/usecases/character-sheet/db-get-character-sheet'
import { DeleteCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/delete-character-sheet'
import { DbDeleteCharacterSheet } from '../../../data/usecases/character-sheet/db-delete-character-sheet'

export const makeDeleteCharacterSheetController = (): DeleteCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getCharacterSheetMongoRepository = new GetCharacterSheetMongoRepository()
  const dbGetCharacterSheet = new DbGetCharacterSheet(getCharacterSheetMongoRepository)
  const deleteCharacterSheetMongoRepository = new DeleteCharacterSheetMongoRepository()
  const dbDeleteCharacterSheet = new DbDeleteCharacterSheet(deleteCharacterSheetMongoRepository)
  const controller = new DeleteCharacterSheetController(authenticatedValidatorAdapter, adminValidatorAdapter, userDecoderAdapter, dbGetCharacterSheet, dbDeleteCharacterSheet)
  return controller
}
