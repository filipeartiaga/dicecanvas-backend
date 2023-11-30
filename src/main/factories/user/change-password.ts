import { DbGetUser } from '../../../data/user/usecases/db-get-user'
import { DbUpdateUser } from '../../../data/user/usecases/db-update-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user-repository/update-user'
import { ChangePasswordController } from '../../../presentation/controllers/user/change-password'
import { BcryptAdapter } from '../../../utils/user/bcrypt-adapter'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
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
