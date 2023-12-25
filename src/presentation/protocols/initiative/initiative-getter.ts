import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface InitiativeGetter {
  getById(_id: string): Promise<InitiativeModel>
}
