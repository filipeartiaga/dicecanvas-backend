import { InitiativeModel } from '../../models/initiative/initiative'

export interface AddInitiativeModel {
  name: string
  initiative: number
  isSurprised: boolean
  isActive: boolean
}

export interface AddInitiative {
  add: (initiative: AddInitiativeModel) => Promise<InitiativeModel>
}
