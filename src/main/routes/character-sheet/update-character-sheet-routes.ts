import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeEditCharacterSheetController } from '../../factories/character-sheet/edit'

export default (router: Router): void => {
  router.put('/character-sheets/', adaptRoute(makeEditCharacterSheetController()))
}
