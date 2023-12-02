import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeGetCharacterSheetController } from '../../factories/character-sheet/get'

export default (router: Router): void => {
  router.get('/character-sheets/get-by-id', adaptRoute(makeGetCharacterSheetController()))
}
