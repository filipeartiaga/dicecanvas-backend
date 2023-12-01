import { DbGetUser } from '../../../data/usecases/user/db-get-user'
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user-repository/get-user'
import { GetMyUserController } from '../../../presentation/controllers/user/get-my-user'
import { UserDecoderAdapter } from '../../../utils/user/user-decoder-adapter'
import env from '../../config/env'

export const makeGetMyUserController = (): GetMyUserController => {
  const getUserMongoRepository = new GetUserMongoRepository()
  const dbGetUser = new DbGetUser(getUserMongoRepository)
  const secret = env.jwtSecret
  const userDecoderAdapter = new UserDecoderAdapter(secret)
  const getMyUserController = new GetMyUserController(userDecoderAdapter, dbGetUser)
  return getMyUserController
}
