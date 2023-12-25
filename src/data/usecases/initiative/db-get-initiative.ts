import { InitiativeModel } from '../../../domain/models/initiative/initiative'
import { GetInitiativeRepository } from '../../protocols/initiative/get-initiative-repository'
import { GetInitiative } from '../../../domain/usescases/initiative/get-initiative'

export class DbGetInitiative implements GetInitiative {
  private readonly getInitiativeRepository: GetInitiativeRepository

  constructor (getInitiativeRepository: GetInitiativeRepository) {
    this.getInitiativeRepository = getInitiativeRepository
  }

  async getById (_id: string): Promise<InitiativeModel> {
    const initiative = await this.getInitiativeRepository.getById(_id)
    return initiative
  }
}
