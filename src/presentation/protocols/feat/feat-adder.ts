import { FeatModel } from '../../../domain/models/feat/feat'
import { AddFeatModel } from '../../../domain/usescases/feat/add-feat'

export interface FeatAdder {
  add(FeatData: AddFeatModel): Promise<FeatModel>
}
