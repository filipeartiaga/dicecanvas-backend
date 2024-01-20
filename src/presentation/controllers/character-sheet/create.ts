import { CharacterSheetAdder } from '../../protocols/character-sheet'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AuthenticatedValidator } from '../../protocols/user'
import { Controller } from '../../protocols/controller'

export class CreateCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly characterSheetAdder: CharacterSheetAdder
  private readonly userDecoder: UserDecoder

  constructor (authenticatedValidator: AuthenticatedValidator, characterSheetAdder: CharacterSheetAdder, userDecoder: UserDecoder) {
    this.authenticatedValidator = authenticatedValidator
    this.characterSheetAdder = characterSheetAdder
    this.userDecoder = userDecoder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'classes', 'race', 'level', 'background', 'alignment', 'experiencePoints', 'inspiration', 'armorClass', 'maxHitpoints', 'currentHitpoints', 'temporaryHitpoints', 'hitDice', 'totalHitDice', 'personalityTraits', 'ideals', 'bonds', 'flaws', 'abilityScores', 'savingThrows', 'skills', 'deathSaves', 'attacks', 'equipment', 'feats', 'featuresAndTraits', 'otherProficiencies', 'buffsAndNerfs', 'spellSlots', 'expertize', 'aditionalConfigs']
      for (const field of requiredFields) {
        if (typeof httpRequest.body[field] === 'undefined') {
          return badRequest(new MissingParamError(field))
        }
      }

      const accessToken = httpRequest.headers['access-token']
      const isAuthenticated = await this.authenticatedValidator.isAuthenticated(accessToken)

      if (!isAuthenticated) {
        return unauthorized(new UnauthorizedError())
      }

      const creator = this.userDecoder.decode(accessToken)

      const {
        name,
        classes,
        race,
        level,
        background,
        alignment,
        experiencePoints,
        inspiration,
        armorClass,
        maxHitpoints,
        currentHitpoints,
        temporaryHitpoints,
        hitDice,
        totalHitDice,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        abilityScores,
        savingThrows,
        skills,
        deathSaves,
        attacks,
        equipment,
        feats,
        featuresAndTraits,
        otherProficiencies,
        buffsAndNerfs,
        spellSlots,
        customSlots,
        wealth,
        expertize,
        aditionalConfigs
      } = httpRequest.body

      const createdAt = new Date()

      const characterSheet = await this.characterSheetAdder.add({
        creator,
        name,
        classes,
        race,
        level,
        background,
        alignment,
        experiencePoints,
        inspiration,
        armorClass,
        maxHitpoints,
        currentHitpoints,
        temporaryHitpoints,
        hitDice,
        totalHitDice,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        abilityScores,
        savingThrows,
        skills,
        deathSaves,
        attacks,
        equipment,
        feats,
        featuresAndTraits,
        otherProficiencies,
        buffsAndNerfs,
        spellSlots,
        customSlots,
        wealth,
        expertize,
        aditionalConfigs,
        notes: [{
          name: 'Bio',
          text: ''
        }],
        createdAt
      })

      return ok({
        characterSheet
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
