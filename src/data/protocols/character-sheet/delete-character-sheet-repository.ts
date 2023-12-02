export interface DeleteCharacterSheetRepository {
  delete: (_id: string) => Promise<any>
}
