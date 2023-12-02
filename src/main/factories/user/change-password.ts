import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { DbUpdateUser } from '../../../data/usecases/user/db-update-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user-repository/update-user'
import { ChangePasswordController } from '../../../presentation/controllers/user/change-password'
import { BcryptAdapter, UserDecoderAdapter } from '../../../utils/user'
import env from '../../config/env'

export const makeChangePasswordController = (): ChangePasswordController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const dbUpdateUser = new DbUpdateUser(updateUserMongoRepository)
  const changePasswordController = new ChangePasswordController(userDecoderAdapter, dbGetUser, encrypterAdapter, dbUpdateUser)
  return changePasswordController
}
