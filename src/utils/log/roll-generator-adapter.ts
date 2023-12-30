import { RollResult, Roll, Dice } from '../../domain/models/log/roll-result'
import { RollGenerator } from '../../presentation/protocols/log/roll-generator'

export class RollGeneratorAdapter implements RollGenerator {
  generate (diceNotation: string): RollResult {
    diceNotation = diceNotation.toLowerCase().replace(/ /g, '')
    const componentsFromNotation = diceNotation.split(/(?=[+-])/)

    const die: Dice[] = []
    let modifiersSum = 0

    componentsFromNotation.forEach(component => {
      const originalNotation = component
      const isNegative = component.includes('-')
      let hasAdvantage = false
      let hasDisadvantage = false

      if (component[component.length - 1] === 'a' || component[component.length - 1] === 'A' || component[component.length - 1] === 'v' || component[component.length - 1] === 'V') {
        component = component.slice(0, -1)
        hasAdvantage = true
      } else if (component[component.length - 1] === 'd' || component[component.length - 1] === 'D') {
        component = component.slice(0, -1)
        hasDisadvantage = true
      }

      if (component.includes('d') || component.includes('D')) {
        const quantity = parseInt(component.replace('+', '').replace('-', '').split('d')[0]) || 1
        const quality = parseInt(component.replace('+', '').replace('-', '').split('d')[1])

        const rolls: Roll[] = []

        for (let i = 0; i < quantity; i++) {
          rolls.push({
            result: Math.floor(Math.random() * quality) + 1,
            isUsed: true
          })
        }

        if (hasAdvantage) {
          rolls.sort((a, b) => b.result - a.result)
          rolls.forEach(element => {
            element.isUsed = false
          })
          rolls[0].isUsed = true
        }

        if (hasDisadvantage) {
          rolls.sort((a, b) => a.result - b.result)
          rolls.forEach(element => {
            element.isUsed = false
          })
          rolls[0].isUsed = true
        }

        let result = 0

        rolls.forEach(element => {
          result += element.isUsed ? element.result : 0
        })

        die.push({
          notation: originalNotation,
          result: isNegative ? result * -1 : result,
          rolls,
          hasAdvantage,
          hasDisadvantage
        })
      } else {
        modifiersSum += parseInt(component)
      }
    })

    let result = 0

    die.forEach(element => {
      result += element.result
    })

    result += modifiersSum

    const rollResult: RollResult = {
      die,
      modifiers: modifiersSum,
      result
    }

    return rollResult
  }
}
