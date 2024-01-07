import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeChangePasswordController } from '../../factories/user/change-password'

export default (router: Router): void => {
  router.post('/api/users/change-password', adaptRoute((makeChangePasswordController())))
}
