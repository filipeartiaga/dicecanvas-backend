import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeUpdateUserController } from '../../../main/factories/user/update'

export default (router: Router): void => {
  router.put('/api/users/', adaptRoute(makeUpdateUserController()))
}
