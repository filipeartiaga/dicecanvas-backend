import { InitiativeModel } from '../../../domain/models/initiative/initiative'
import { AddInitiativeModel } from '../../../domain/usescases/initiative/add-initiative'

export interface AddInitiativeRepository {
  add: (initiativeData: AddInitiativeModel) => Promise<InitiativeModel>
}
