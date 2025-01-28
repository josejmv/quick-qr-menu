// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import UserModel from '@/_lib/database/models/user'

// types
import type { UserDataType } from '@/_types/models/user'

export const createUser = async (user: UserDataType) => {
  await dbConnect()
  const userResponse = await UserModel.create(user).catch((error) => error)

  if (userResponse.errors) return userResponse.errors
  else return JSON.parse(JSON.stringify(userResponse)) as UserDataType[]
}
