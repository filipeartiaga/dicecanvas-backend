import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateLogController } from '../../factories/log/create'

export default (router: Router): void => {
  router.post('/logs/', adaptRoute(makeCreateLogController()))
}
