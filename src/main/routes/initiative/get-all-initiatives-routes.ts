import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllInitiativeController } from '../../../main/factories/initiative/get-all'

export default (router: Router): void => {
  router.get('/initiatives/', adaptRoute(makeGetAllInitiativeController()))
}
