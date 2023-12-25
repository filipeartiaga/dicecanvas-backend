import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface AllInitiativeGetter {
  getAll(): Promise<InitiativeModel[]>
}
