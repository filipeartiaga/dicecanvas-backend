import { FeatModel } from '../../models/feat/feat'

export interface GetFeat {
  getById (_id: string): Promise<FeatModel | null>
}
