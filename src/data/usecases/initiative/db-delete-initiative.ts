import { DeleteInitiative } from '../../../domain/usescases/initiative/delete-initiative'
import { DeleteInitiativeRepository } from '../../protocols/initiative/delete-initiative-repository'

export class DbDeleteInitiative implements DeleteInitiative {
  private readonly deleteInitiativeRepository: DeleteInitiativeRepository

  constructor (deleteInitiativeRepository: DeleteInitiativeRepository) {
    this.deleteInitiativeRepository = deleteInitiativeRepository
  }

  async delete (_id: string): Promise<any> {
    const response = await this.deleteInitiativeRepository.delete(_id)
    return response
  }
}
