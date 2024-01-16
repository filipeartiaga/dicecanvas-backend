import { FeatModel } from '../../../domain/models/feat/feat'

export interface FeatGetter {
  getById(_id: string): Promise<FeatModel | null>
}
