import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface GetAllInitiativesRepository {
  getAll: () => Promise<InitiativeModel[]>
}
