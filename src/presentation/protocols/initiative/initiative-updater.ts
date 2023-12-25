import { InitiativeModel } from '../../../domain/models/initiative/initiative'

export interface InitiativeUpdater {
  update(initiativeData: InitiativeModel): Promise<InitiativeModel>
}
