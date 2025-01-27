// models
import UserModel from '@/_lib/database/models/user'

// types
import type { UserDataType } from '@/_types/models/user'

export const GetAllService = async () => {
  const users = await UserModel.find()
  if (!users) return undefined
  else return JSON.parse(JSON.stringify(users)) as UserDataType[]
}

export const LoginService = async (username: string | undefined) => {
  const user = await UserModel.findOne({ username: username })
  if (!user) return undefined
  else return JSON.parse(JSON.stringify(user)) as UserDataType
}

export const SignUpService = async (user: Omit<UserDataType, '_id'>) => {
  const userResponse = await UserModel.create(user).catch((error) => error)

  if (userResponse.errors) return userResponse.errors
  return JSON.parse(JSON.stringify(userResponse)) as UserDataType
}
