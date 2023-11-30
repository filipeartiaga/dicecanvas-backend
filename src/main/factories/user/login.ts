import { DbGetUser } from '../../../data/user/usecases/db-get-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { LoginController } from '../../../presentation/controllers/user/login'
import { BcryptAdapter } from '../../../utils/user/bcrypt-adapter'
import { EmailValidatorAdapter } from '../../../utils/user/email-validator-adapter'
import { UserSignerAdapter } from '../../../utils/user/user-signer-adapter'
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
