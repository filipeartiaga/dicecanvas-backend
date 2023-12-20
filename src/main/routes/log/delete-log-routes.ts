import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteLogController } from '../../factories/log/delete'

export default (router: Router): void => {
  router.delete('/logs/', adaptRoute(makeDeleteLogController()))
}
