import { RollResult } from '../../../domain/models/log/roll-result'

export interface RollGenerator {
  generate(rollRaw: string): RollResult
}
