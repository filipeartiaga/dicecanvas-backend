export interface CharacterSheetDeleter {
  delete(characterSheetIds: string): Promise<any>
}
