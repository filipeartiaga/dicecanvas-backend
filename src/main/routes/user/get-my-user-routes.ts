import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetMyUserController } from '../../factories/user/get-my-user'

export default (router: Router): void => {
  router.get('/users/me', adaptRoute(makeGetMyUserController()))
}
