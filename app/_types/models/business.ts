// types
import type { UserDataType } from './user'

export type BusinessDataType = {
  _id: string
  name: string
  slug: string
  description: string
  owner: UserDataType
  employees: UserDataType[]
  addresses: BusinessAdressDataType[]
}

export type BusinessAdressDataType = {
  _id: string
  city: string
  address: string
  business: string
}
