import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeUpdateInitiativeController } from '../../factories/initiative/update'

export default (router: Router): void => {
  router.put('/initiatives/', adaptRoute(makeUpdateInitiativeController()))
}
