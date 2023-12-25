import { ClearInitiative } from '../../../domain/usescases/initiative/clear-initiative'
import { ClearInitiativeRepository } from '../../protocols/initiative/clear-initiative-repository'

export class DbClearInitiative implements ClearInitiative {
  private readonly clearInitiativeRepository: ClearInitiativeRepository

  constructor (clearInitiativeRepository: ClearInitiativeRepository) {
    this.clearInitiativeRepository = clearInitiativeRepository
  }

  async clear (): Promise<any> {
    const response = await this.clearInitiativeRepository.clear()
    return response
  }
}
