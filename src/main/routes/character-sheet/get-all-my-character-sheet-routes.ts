import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllMyCharacterSheetController } from '../../factories/character-sheet/get-my'

export default (router: Router): void => {
  router.get('/character-sheets/get-all-my', adaptRoute(makeGetAllMyCharacterSheetController()))
}
