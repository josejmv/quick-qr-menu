// types
import type { UserDataType } from './user'

export type BusinessDataType = {
  _id: string
  name: string
  slug: string
  description: string
  owner: UserDataType
}
