import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateInitiativeController } from 'src/main/factories/initiative/create'

export default (router: Router): void => {
  router.post('/initiatives/', adaptRoute(makeCreateInitiativeController()))
}
