import { FeatModel } from '../../models/feat/feat'

export interface GetAllFeat {
  getAll (): Promise<FeatModel[]>
}
