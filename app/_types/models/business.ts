// types
import type { UserDataType } from './user'

export type BusinessDataType = {
  id: number
  name: string
  slug: string
  owner: UserDataType
  employees: UserDataType[]
}
