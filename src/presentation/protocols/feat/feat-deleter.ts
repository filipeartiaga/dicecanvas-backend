export interface FeatDeleter {
  delete(FeatIds: string): Promise<any>
}
