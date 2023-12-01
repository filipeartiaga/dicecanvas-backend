import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { DbUpdateUser } from '../../../data/usecases/user/db-update-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user-repository/update-user'
import { FirstAccessLoginController } from '../../../presentation/controllers/user/first-access-login'
import { UserSignerAdapter } from '../../../utils/user/user-signer-adapter'
import env from '../../config/env'

export const makeFirstAccessLoginController = (): FirstAccessLoginController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const dbUpdateUser = new DbUpdateUser(updateUserMongoRepository)
  const secret = env.jwtSecret
  const userSignerAdapter = new UserSignerAdapter(secret)
  const firstAccessLoginController = new FirstAccessLoginController(dbGetUser, dbUpdateUser, userSignerAdapter)
  return firstAccessLoginController
}
