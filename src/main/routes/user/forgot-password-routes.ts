import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeForgotPasswordController } from '../../factories/user/forgot-password'

export default (router: Router): void => {
  router.post('/users/forgot-password', adaptRoute(makeForgotPasswordController()))
}
