export interface LogModel {
  _id: string
  userId: string
  characterSheetId: string
  type: string
  message: string
  rollResult: string
  rollRaw: string
  createdAt: Date
}
