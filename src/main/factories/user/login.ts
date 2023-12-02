import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { LoginController } from '../../../presentation/controllers/user/login'
import { BcryptAdapter, EmailValidatorAdapter, UserSignerAdapter } from '../../../utils/user'
import env from '../../config/env'

export const makeLoginController = (): LoginController => {
  const emailValdatorAdapter = new EmailValidatorAdapter()
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const salt = 12
  const encrypterAdapter = new BcryptAdapter(salt)
  const secret = env.jwtSecret
  const userSignerAdapter = new UserSignerAdapter(secret)
  const loginController = new LoginController(emailValdatorAdapter, dbGetUser, encrypterAdapter, userSignerAdapter)
  return loginController
}
