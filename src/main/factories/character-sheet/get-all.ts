import { AdminValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { GetAllCharacterSheetController } from '../../../presentation/controllers/character-sheet/get-all'
import { DbGetAllCharacterSheet } from '../../../data/usecases/character-sheet/db-get-all-character-sheet'
import { GetAllCharacterSheetMongoRepository } from 'src/infra/db/mongodb/status/get-all-character-sheet'

export const makeGetAllCharacterSheetController = (): GetAllCharacterSheetController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getAllCharacterSheetMongoRepository = new GetAllCharacterSheetMongoRepository()
  const dbGetAllCharacterSheet = new DbGetAllCharacterSheet(getAllCharacterSheetMongoRepository)
  const adminValidatorAdapter = new AdminValidatorAdapter(dbGetUser, userDecoderAdapter)
  const controller = new GetAllCharacterSheetController(adminValidatorAdapter, dbGetAllCharacterSheet)
  return controller
}
