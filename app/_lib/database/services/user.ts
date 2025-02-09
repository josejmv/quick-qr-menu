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
  else return JSON.parse(JSON.stringify(userResponse)) as UserDataType
}

export const deleteUser = async (userId: string) => {
  await dbConnect()
  const userResponse = await UserModel.findByIdAndDelete(userId).catch(
    (error) => error
  )

  if (userResponse.errors) return userResponse.errors
  else return JSON.parse(JSON.stringify(userResponse)) as UserDataType[]
}

export const getUsersByBusinessId = async (businessId: string) => {
  await dbConnect()
  const usersResponse = await UserModel.find({ business: businessId }).catch(
    (error) => error
  )

  if (usersResponse.errors) return usersResponse.errors
  else return JSON.parse(JSON.stringify(usersResponse)) as UserDataType[]
}
