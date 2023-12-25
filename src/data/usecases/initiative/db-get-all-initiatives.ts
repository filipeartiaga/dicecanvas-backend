import { GetAllInitiativesRepository } from '../../protocols/initiative/get-all-initiatives-repository'
import { InitiativeModel } from '../../../domain/models/initiative/initiative'
import { GetAllInitiatives } from '../../../domain/usescases/initiative/get-all-initiatives'

export class DbGetAllInitiative implements GetAllInitiatives {
  private readonly getAllInitiativeRepository: GetAllInitiativesRepository

  constructor (getAllInitiativeRepository: GetAllInitiativesRepository) {
    this.getAllInitiativeRepository = getAllInitiativeRepository
  }

  async getAll (): Promise<InitiativeModel[]> {
    const initiative = await this.getAllInitiativeRepository.getAll()
    return initiative
  }
}
