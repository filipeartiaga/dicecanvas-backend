import { AdminValidatorAdapter, AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetCharacterSheetController } from '../../../presentation/controllers/character-sheet/get'
import { GetCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/get-character-sheet'
import { DbGetCharacterSheet } from '../../../data/usecases/character-sheet/db-get-character-sheet'

export const makeGetCharacterSheetController = (): GetCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const getCharacterSheetMongoRepository = new GetCharacterSheetMongoRepository()
  const dbGetCharacterSheet = new DbGetCharacterSheet(getCharacterSheetMongoRepository)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const controller = new GetCharacterSheetController(authenticatedValidatorAdapter, adminValidatorAdapter, userDecoderAdapter, dbGetCharacterSheet)
  return controller
}
