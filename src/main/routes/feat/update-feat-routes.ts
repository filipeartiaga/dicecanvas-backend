import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeEditFeatController } from '../../factories/feat/edit'

export default (router: Router): void => {
  router.put('/api/feats/', adaptRoute(makeEditFeatController()))
}
