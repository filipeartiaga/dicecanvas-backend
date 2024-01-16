export interface DeleteFeatRepository {
  delete: (_id: string) => Promise<any>
}
