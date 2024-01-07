import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeForgetPasswordTokenAuthenticate } from '../../factories/user/token-authenticate'

export default (router: Router): void => {
  router.post('/api/users/forgot-password-token-authenticate', adaptRoute(makeForgetPasswordTokenAuthenticate()))
}
