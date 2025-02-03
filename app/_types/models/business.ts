// types
import type { MenuDataType } from './menu'
import type { UserDataType } from './user'

export type BusinessDataType = {
  _id: string
  name: string
  slug: string
  menu: MenuDataType
  description: string
  owner: UserDataType
  employees: UserDataType[]
}

export type UpdateBusinessDataType = {
  name?: string
  slug?: string
  menu?: string
  description?: string
  $push?: { employees?: UserDataType }
}
