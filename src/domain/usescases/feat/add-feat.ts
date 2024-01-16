import { FeatModel } from '../../models/feat/feat'

export interface AddFeatModel {
  name: string
  abilityScoresIncreaseOptions: string[]
  description: string
  prerequisites: string
}

export interface AddFeat {
  add (feat: AddFeatModel): Promise<FeatModel>
}
