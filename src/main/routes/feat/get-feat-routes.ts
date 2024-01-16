import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetFeatController } from '../../factories/feat/get'

export default (router: Router): void => {
  router.get('/api/feats/get-by-id', adaptRoute(makeGetFeatController()))
}
