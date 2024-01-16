import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteFeatController } from '../../factories/feat/delete'

export default (router: Router): void => {
  router.delete('/api/feats/', adaptRoute(makeDeleteFeatController()))
}
