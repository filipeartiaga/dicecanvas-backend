import { InitiativeModel } from '../../models/initiative/initiative'

export interface GetAllInitiatives {
  getAll (): Promise<InitiativeModel[]>
}
