import { AddInitiativeRepository } from '../../protocols/initiative/add-initiative-repository'
import { InitiativeModel } from '../../../domain/models/initiative/initiative'
import { AddInitiative, AddInitiativeModel } from '../../../domain/usescases/initiative/add-initiative'

export class DbAddInitiative implements AddInitiative {
  private readonly addInitiativeRepository: AddInitiativeRepository

  constructor (addInitiativeRepository: AddInitiativeRepository) {
    this.addInitiativeRepository = addInitiativeRepository
  }

  async add (initiativeData: AddInitiativeModel): Promise<InitiativeModel> {
    const initiative = await this.addInitiativeRepository.add(initiativeData)
    return initiative
  }
}
