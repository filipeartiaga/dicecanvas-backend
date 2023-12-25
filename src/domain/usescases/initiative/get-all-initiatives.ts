import { InitiativeModel } from 'src/domain/models/initiative/initiative'

export interface GetAllInitiatives {
  getAll (): Promise<InitiativeModel[]>
}
