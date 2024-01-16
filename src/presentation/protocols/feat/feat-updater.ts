import { FeatModel } from '../../../domain/models/feat/feat'

export interface FeatUpdater {
  update(Feat: FeatModel): Promise<FeatModel>
}
