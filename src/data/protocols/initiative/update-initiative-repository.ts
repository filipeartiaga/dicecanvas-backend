import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface UpdateInitiativeRepository {
  update: (initiativeData: InitiativeModel) => Promise<InitiativeModel>
}
