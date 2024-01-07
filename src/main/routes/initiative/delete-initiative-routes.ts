import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteInitiativeController } from '../../../main/factories/initiative/delete'

export default (router: Router): void => {
  router.delete('/api/initiatives/', adaptRoute(makeDeleteInitiativeController()))
}
