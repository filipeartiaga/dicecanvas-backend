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
      } = httpRequest.body

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

      attacks.forEach((attack) => {
        let willKeep = false
        Object.keys(attack).forEach((key) => {
          if (attack[key] !== '') {
            willKeep = true
          }
        })
        if (!willKeep) {
          attacks.splice(attacks.indexOf(attack), 1)
        }
      })

      characterSheet.name = name
      characterSheet.classes = classes
      characterSheet.race = race
      characterSheet.level = level
      characterSheet.background = background
      characterSheet.alignment = alignment
      characterSheet.experiencePoints = experiencePoints
      characterSheet.inspiration = inspiration
      characterSheet.armorClass = armorClass
      characterSheet.maxHitpoints = maxHitpoints
      characterSheet.currentHitpoints = currentHitpoints
      characterSheet.temporaryHitpoints = temporaryHitpoints
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
      characterSheet.attacks = attacks
      characterSheet.equipment = equipment
      characterSheet.feats = feats
      characterSheet.featuresAndTraits = featuresAndTraits
      characterSheet.otherProficiencies = otherProficiencies
      characterSheet.buffsAndNerfs = buffsAndNerfs
      characterSheet.spellSlots = spellSlots
      characterSheet.customSlots = customSlots
      characterSheet.wealth = wealth
      if (expertize) characterSheet.expertize = expertize
      if (aditionalConfigs) characterSheet.aditionalConfigs = aditionalConfigs

      characterSheet.equipment.forEach((equipment) => {
        if (equipment.length === 0) {
          characterSheet.equipment.splice(characterSheet.equipment.indexOf(equipment), 1)
        }
      })

      characterSheet.featuresAndTraits.forEach((feature) => {
        if (feature.length === 0) {
          characterSheet.featuresAndTraits.splice(characterSheet.featuresAndTraits.indexOf(feature), 1)
        }
      })

      characterSheet.otherProficiencies.forEach((proficiency) => {
        if (proficiency.length === 0) {
          characterSheet.otherProficiencies.splice(characterSheet.otherProficiencies.indexOf(proficiency), 1)
        }
      })

      characterSheet.classes.forEach((classItem) => {
        if (classItem.name === '' || classItem.level === 0) {
          characterSheet.classes.splice(characterSheet.classes.indexOf(classItem), 1)
        }
      })

      characterSheet.feats.forEach((feat) => {
        if (feat.feat._id === '' || feat.feat.name === '' || feat.feat.description === '') {
          characterSheet.feats.splice(characterSheet.feats.indexOf(feat), 1)
        }
      })

      const updatedCharacterSheet = await this.characterSheetUpdater.update(characterSheet)

      return ok({
        updatedCharacterSheet
      })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
