export interface DeleteLogRepository {
  delete: (_id: string) => Promise<any>
}
