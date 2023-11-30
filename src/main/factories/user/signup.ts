import { DbAddUser } from '../../../data/user/usecases/db-add-user'
import { DbGetUser } from '../../../data/user/usecases/db-get-user'
import { AddUserMongoRepository } from '../../../infra/db/mongodb/user-repository/add-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { SignUpController } from '../../../presentation/controllers/user/signup'
import { EmailValidatorAdapter } from '../../../utils/user/email-validator-adapter'
import { FirstAccessEmailSenderAdapter } from '../../../utils/user/first-access-email-sender-adapter'
import { FirstAccessTokenGeneratorAdapter } from '../../../utils/user/first-access-token-generator-adapter'
import { UserSignerAdapter } from '../../../utils/user/user-signer-adapter'
import env from '../../config/env'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const firstAccessTokenGeneratorAdapter = new FirstAccessTokenGeneratorAdapter()
  const addUserMongoRepository = new AddUserMongoRepository()
  const dbAddUser = new DbAddUser(addUserMongoRepository)
  const firstAccessEmailSenderAdapter = new FirstAccessEmailSenderAdapter()
  const secret = env.jwtSecret
  const userSignerAdapter = new UserSignerAdapter(secret)
  const signUpController = new SignUpController(emailValidatorAdapter, dbGetUser, firstAccessTokenGeneratorAdapter, dbAddUser, firstAccessEmailSenderAdapter, userSignerAdapter)
  return signUpController
}
