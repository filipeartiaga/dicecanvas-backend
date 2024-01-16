import { FeatModel } from '../../../domain/models/feat/feat'

export interface GetFeatRepository {
  getById: (_id: string) => Promise<FeatModel | null>
}
