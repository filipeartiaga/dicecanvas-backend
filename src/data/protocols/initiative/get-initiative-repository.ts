import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface GetInitiativeRepository {
  getById: (_id: string) => Promise<InitiativeModel>
}
