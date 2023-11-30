import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeLoginController } from '../../factories/user/login'

export default (router: Router): void => {
  router.post('/users/login', adaptRoute(makeLoginController()))
}
