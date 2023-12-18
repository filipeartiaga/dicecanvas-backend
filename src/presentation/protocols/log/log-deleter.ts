export interface LogDeleter {
  delete(logId: string): Promise<any>
}
