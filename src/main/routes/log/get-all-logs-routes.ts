import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllLogController } from '../../factories/log/get-all'

export default (router: Router): void => {
  router.get('/logs/', adaptRoute(makeGetAllLogController()))
}
