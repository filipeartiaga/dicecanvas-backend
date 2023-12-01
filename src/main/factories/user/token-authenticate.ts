import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { ForgotPasswordTokenAuthenticateController } from '../../../presentation/controllers/user/forgot-password-token-authenticate'
import { EmailValidatorAdapter } from '../../../utils/user/email-validator-adapter'
import { UserSignerAdapter } from '../../../utils/user/user-signer-adapter'
import env from '../../config/env'

export const makeForgetPasswordTokenAuthenticate = (): ForgotPasswordTokenAuthenticateController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()

  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)

  const secret = env.jwtSecret
  const userSignerAdapter = new UserSignerAdapter(secret)

  const tokenAuthenticateController = new ForgotPasswordTokenAuthenticateController(emailValidatorAdapter, dbGetUser, userSignerAdapter)
  return tokenAuthenticateController
}
