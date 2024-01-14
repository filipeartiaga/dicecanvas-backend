export interface UserModel {
  _id: string
  name: string
  email: string
  role: string
  password: string
  isVerified: boolean
  passwordResetToken: string
  passwordResetExpires: Date
  firstAccessToken: string
  userSettings: UserSettings
  createdAt: Date
}

export interface UserSettings {
  autoScroll: boolean
}
