import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateFeatController } from '../../factories/feat/create'

export default (router: Router): void => {
  router.post('/api/feats/', adaptRoute(makeCreateFeatController()))
}
