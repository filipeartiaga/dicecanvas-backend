import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllFeatController } from '../../factories/feat/get-all'

export default (router: Router): void => {
  router.get('/api/feats/get-all', adaptRoute(makeGetAllFeatController()))
}
