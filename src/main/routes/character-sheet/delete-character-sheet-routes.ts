import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeDeleteCharacterSheetController } from '../../factories/character-sheet/delete'

export default (router: Router): void => {
  router.delete('/api/character-sheets/', adaptRoute(makeDeleteCharacterSheetController()))
}
