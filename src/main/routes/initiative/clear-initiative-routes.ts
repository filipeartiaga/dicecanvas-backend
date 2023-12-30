import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeClearInitiativeController } from '../../../main/factories/initiative/clear'

export default (router: Router): void => {
  router.post('/initiatives/clear/', adaptRoute(makeClearInitiativeController()))
}
