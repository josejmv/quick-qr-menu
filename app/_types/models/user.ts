// types
import type { Schema } from 'mongoose'

export type UserDataType = {
  _id: string
  name: string
  email: string
  picture: string
  username: string
  password: string
  role: 'owner' | 'employee'
  business: Schema.Types.ObjectId
  status: 'active' | 'inactive' | 'pending' | 'delete'
}
