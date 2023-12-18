import { RollValidator } from '../../presentation/protocols/log/roll-validator'

export class RollValidatorAdapter implements RollValidator {
  validate (diceNotation: string): boolean {
    const parts = diceNotation.split(/[+\\-]/)

    for (const part of parts) {
      const subparts = part.split('d')

      if (subparts.length > 2 || subparts.some(subpart => isNaN(Number(subpart)))) {
        return false
      }
    }

    return true
  }
}
