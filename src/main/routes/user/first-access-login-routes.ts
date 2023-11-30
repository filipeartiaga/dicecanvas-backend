import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeFirstAccessLoginController } from '../../factories/user/first-access-login'

export default (router: Router): void => {
  router.post('/users/first-access-login', adaptRoute(makeFirstAccessLoginController()))
}
