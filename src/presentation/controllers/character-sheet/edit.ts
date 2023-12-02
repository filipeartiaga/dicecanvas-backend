import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '../../errors'
import { UserDecoder, AdminValidator, AuthenticatedValidator } from '../../protocols/user'
import { CharacterSheetGetter, CharacterSheetUpdater } from '../../protocols/character-sheet'

export class EditCharacterSheetController implements Controller {
  private readonly authenticatedValidator: AuthenticatedValidator
  private readonly adminValidator: AdminValidator
  private readonly userDecoder: UserDecoder
  private readonly characterSheetGetter: CharacterSheetGetter
  private readonly characterSheetUpdater: CharacterSheetUpdater

  constructor (authenticatedValidator: AuthenticatedValidator, adminValidator: AdminValidator, userDecoder: UserDecoder, characterSheetGetter: CharacterSheetGetter, characterSheetUpdater: CharacterSheetUpdater) {
    this.authenticatedValidator = authenticatedValidator
    this.adminValidator = adminValidator
    this.userDecoder = userDecoder
    this.characterSheetGetter = characterSheetGetter
    this.characterSheetUpdater = characterSheetUpdater
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['_id']
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

      const {
        _id
      } = httpRequest.body._id

      const characterSheet = await this.characterSheetGetter.getById(_id)

      if (!characterSheet) {
        return badRequest(new InvalidParamError('characterSheet'))
      }
      const creator = this.userDecoder.decode(accessToken)

      const isAdmin = await this.adminValidator.isAdmin(accessToken)

      if (!isAdmin && characterSheet.creator !== creator) {
        return unauthorized(new UnauthorizedError())
      }

      const {
        name,
        baseClass,
        race,
        level,
        background,
        alignment,
        experiencePoints,
        inspiration,
        proficiencyBonus,
        armorClass,
        initiative,
        speed,
        maxHitpoints,
        currentHitpoints,
        hitDice,
        totalHitDice,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        abilityScores,
        savingThrows,
        skills,
        deathSaves
      } = httpRequest.body

      characterSheet.name = name
      characterSheet.baseClass = baseClass
      characterSheet.race = race
      characterSheet.level = level
      characterSheet.background = background
      characterSheet.alignment = alignment
      characterSheet.experiencePoints = experiencePoints
      characterSheet.inspiration = inspiration
      characterSheet.proficiencyBonus = proficiencyBonus
      characterSheet.armorClass = armorClass
      characterSheet.initiative = initiative
      characterSheet.speed = speed
      characterSheet.maxHitpoints = maxHitpoints
      characterSheet.currentHitpoints = currentHitpoints
      characterSheet.hitDice = hitDice
      characterSheet.totalHitDice = totalHitDice
      characterSheet.personalityTraits = personalityTraits
      characterSheet.ideals = ideals
      characterSheet.bonds = bonds
      characterSheet.flaws = flaws
      characterSheet.abilityScores = abilityScores
      characterSheet.savingThrows = savingThrows
      characterSheet.skills = skills
      characterSheet.deathSaves = deathSaves

      const updatedCharacterSheet = await this.characterSheetUpdater.update(characterSheet)

      return ok({
        updatedCharacterSheet
      })
    } catch (error) {
      return serverError()
    }
  }
}
