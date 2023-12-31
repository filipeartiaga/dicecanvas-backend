import { UpdateInitiative } from 'src/domain/usescases/initiative/update-initiative'
import { InitiativeModel } from '../../../domain/models/initiative/initiative'
import { UpdateInitiativeRepository } from '../../protocols/initiative/update-initiative-repository'

export class DbUpdateInitiative implements UpdateInitiative {
  private readonly updateInitiativeRepository: UpdateInitiativeRepository

  constructor (updateInitiativeRepository: UpdateInitiativeRepository) {
    this.updateInitiativeRepository = updateInitiativeRepository
  }

  async update (initiativeData: InitiativeModel): Promise<InitiativeModel> {
    const initiative = await this.updateInitiativeRepository.update(initiativeData)
    return initiative
  }
}
