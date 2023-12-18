import { AdminValidatorAdapter, AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/get-character-sheet'
import { DbGetCharacterSheet } from '../../../data/usecases/character-sheet/db-get-character-sheet'
import { EditCharacterSheetController } from '../../../presentation/controllers/character-sheet/edit'
import { UpdateCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/update-character-sheet'
import { DbUpdateCharacterSheet } from '../../../data/usecases/character-sheet/db-update-character-sheet'

export const makeEditCharacterSheetController = (): EditCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getCharacterSheetMongoRepository = new GetCharacterSheetMongoRepository()
  const dbGetCharacterSheet = new DbGetCharacterSheet(getCharacterSheetMongoRepository)
  const updateCharacterSheetMongoRepository = new UpdateCharacterSheetMongoRepository()
  const dbUpdateCharacterSheet = new DbUpdateCharacterSheet(updateCharacterSheetMongoRepository)
  const controller = new EditCharacterSheetController(authenticatedValidatorAdapter, adminValidatorAdapter, userDecoderAdapter, dbGetCharacterSheet, dbUpdateCharacterSheet)
  return controller
}
