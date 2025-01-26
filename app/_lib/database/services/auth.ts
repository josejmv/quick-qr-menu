// models
import UserModel from '@/_lib/database/models/user'

// types
import type { UserDataType } from '~/app/_types/models/user'

export const LoginService = async (username: string | undefined) => {
  const user = await UserModel.findOne({ username: username })
  if (!user) return undefined
  else return JSON.parse(JSON.stringify(user)) as UserDataType
}
