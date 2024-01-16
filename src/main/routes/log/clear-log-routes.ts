import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeClearLogController } from '../../../main/factories/log/clear'

export default (router: Router): void => {
  router.post('/api/logs/clear/', adaptRoute(makeClearLogController()))
}
