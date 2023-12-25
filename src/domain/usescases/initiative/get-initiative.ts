import { InitiativeModel } from '../../models/initiative/initiative'

export interface GetInitiative {
  getById (_id: string): Promise<InitiativeModel>
}
