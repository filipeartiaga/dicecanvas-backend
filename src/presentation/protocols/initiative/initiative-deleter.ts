export interface InitiativeDeleter {
  delete(initiativeId: string): Promise<any>
}
