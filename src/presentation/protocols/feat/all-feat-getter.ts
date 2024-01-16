import { FeatModel } from '../../../domain/models/feat/feat'

export interface AllFeatGetter {
  getAll(): Promise<FeatModel[]>
}
