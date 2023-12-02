import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetAllCharacterSheetController } from '../../factories/character-sheet/get-all'

export default (router: Router): void => {
  router.get('/character-sheets/get-all', adaptRoute(makeGetAllCharacterSheetController()))
}
