import { DbAddUser } from '../../../data/usecases/user/db-add-user'
import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { AddUserMongoRepository } from '../../../infra/db/mongodb/user-repository/add-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { SignUpController } from '../../../presentation/controllers/user/signup'
import { EmailValidatorAdapter, FirstAccessEmailSenderAdapter, FirstAccessTokenGeneratorAdapter, UserSignerAdapter } from '../../../utils/user'
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
