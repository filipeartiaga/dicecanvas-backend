export interface AdminValidator {
  isAdmin(accessToken: string): Promise<boolean>
}
