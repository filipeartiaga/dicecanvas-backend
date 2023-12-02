import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { DbUpdateUser } from '../../../data/usecases/user/db-update-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { UpdateUserMongoRepository } from '../../../infra/db/mongodb/user-repository/update-user'
import { ForgotPasswordController } from '../../../presentation/controllers/user/forgot-password'
import { EmailValidatorAdapter, ForgotPasswordEmailSenderAdapter, ForgotPasswordTokenGeneratorAdapter } from '../../../utils/user'

export const makeForgotPasswordController = (): ForgotPasswordController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()

  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)

  const forgotPasswordTokenGeneratorAdapter = new ForgotPasswordTokenGeneratorAdapter()

  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const dbUpdateUser = new DbUpdateUser(updateUserMongoRepository)

  const forgotPasswordEmailSenderAdapter = new ForgotPasswordEmailSenderAdapter()

  const forgotPasswordController = new ForgotPasswordController(emailValidatorAdapter, dbGetUser, forgotPasswordTokenGeneratorAdapter, dbUpdateUser, forgotPasswordEmailSenderAdapter)
  return forgotPasswordController
}
