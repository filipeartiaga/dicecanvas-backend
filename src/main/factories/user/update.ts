import { GetUserMongoRepository } from 'src/infra/db/mongodb/user-repository/get-user'
import { UpdateUserController } from '../../../presentation/controllers/user/update'
import { DbGetUser } from 'src/data/usecases/user/db-get-user'
import env from 'src/main/config/env'
import { UserDecoderAdapter } from 'src/utils/user/user-decoder-adapter'
import { DbUpdateUser } from 'src/data/usecases/user/db-update-user'
import { UpdateUserMongoRepository } from 'src/infra/db/mongodb/user-repository/update-user'

export const makeUpdateUserController = (): UpdateUserController => {
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const dbUpdateUser = new DbUpdateUser(updateUserMongoRepository)
  const editUserController = new UpdateUserController(userDecoderAdapter, dbGetUser, dbUpdateUser)
  return editUserController
}
