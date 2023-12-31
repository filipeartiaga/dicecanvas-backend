import { InitiativeModel } from '../../models/initiative/initiative'

export interface UpdateInitiative {
  update: (initiative: InitiativeModel) => Promise<InitiativeModel>
}
