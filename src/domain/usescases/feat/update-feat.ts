import { FeatModel } from '../../models/feat/feat'

export interface UpdateFeat {
  update (characterSheet: FeatModel): Promise<FeatModel>
}
