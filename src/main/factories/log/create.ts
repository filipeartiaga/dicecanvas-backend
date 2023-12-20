import { AuthenticatedValidatorAdapter, UserDecoderAdapter } from '../../../utils/user'
import { CreateLogController } from '../../../presentation/controllers/log/create'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import env from '../../config/env'
import { AddLogMongoRepository } from '../../../infra/db/mongodb/log/add-log'
import { DbAddLog } from '../../../data/usecases/log/db-add-log'
import { RollGeneratorAdapter } from '../../../utils/log/roll-generator-adapter'
import { DbGetCharacterSheet } from '../../../data/usecases/character-sheet/db-get-character-sheet'
import { GetCharacterSheetMongoRepository } from '../../../infra/db/mongodb/character-sheet/get-character-sheet'

export const makeCreateLogController = (): CreateLogController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const authenticatedValidatorAdapter = new AuthenticatedValidatorAdapter(dbGetUser, userDecoderAdapter)
  const addLogMongoRepository = new AddLogMongoRepository()
  const dbAddLog = new DbAddLog(addLogMongoRepository)
  const rollGeneratorAdaper = new RollGeneratorAdapter()
  const getCharacterSheetMongoRepository = new GetCharacterSheetMongoRepository()
  const dbGetCharacterSheet = new DbGetCharacterSheet(getCharacterSheetMongoRepository)
  const controller = new CreateLogController(authenticatedValidatorAdapter, dbAddLog, userDecoderAdapter, rollGeneratorAdaper, dbGetCharacterSheet)
  return controller
}
