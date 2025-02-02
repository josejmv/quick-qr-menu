// types
import type { BusinessDataType } from './business'

export type UserDataType = {
  _id: string
  name: string
  email: string
  picture: string
  username: string
  password: string
  business: BusinessDataType
  role: 'owner' | 'employee'
  status: 'active' | 'inactive' | 'pending' | 'delete'
}
