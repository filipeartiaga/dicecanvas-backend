import { Dice, RollResult } from '../../domain/models/log/roll-result'
import { RollGenerator } from '../../presentation/protocols/log/roll-generator'

export class RollGeneratorAdapter implements RollGenerator {
  generate (diceNotation: string): RollResult {
    diceNotation = diceNotation.toLowerCase()

    const components = diceNotation.split(/(?=[+-])/)

    const dices: Dice[] = []
    let dicesSum = 0
    let modifiersSum = 0

    components.forEach(component => {
      if (component.includes('d')) {
        const quantity = parseInt(component.split('d')[0])
        const quality = parseInt(component.split('d')[1])

        for (let i = 0; i < quantity; i++) {
          const dice: Dice = {
            quality,
            result: Math.floor(Math.random() * quality) + 1
          }
          dicesSum += dice.result
          dices.push(dice)
        }
      } else {
        modifiersSum += parseInt(component)
      }
    })

    const rollResult: RollResult = {
      dices,
      modifiers: modifiersSum,
      result: dicesSum + modifiersSum
    }

    return rollResult
  }
}
