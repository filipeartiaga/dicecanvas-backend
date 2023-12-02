import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateCharacterSheetController } from '../../factories/character-sheet/create'

export default (router: Router): void => {
  router.post('/character-sheets/', adaptRoute(makeCreateCharacterSheetController()))
}
