export interface AuthenticatedValidator {
  isAuthenticated(accessToken: string): Promise<boolean>
}
