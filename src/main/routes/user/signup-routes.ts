import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignUpController } from '../../factories/user/signup'

export default (router: Router): void => {
  router.post('/api/users/signup', adaptRoute(makeSignUpController()))
}
