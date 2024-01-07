import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateInitiativeController } from '../../../main/factories/initiative/create'

export default (router: Router): void => {
  router.post('/api/initiatives/', adaptRoute(makeCreateInitiativeController()))
}
