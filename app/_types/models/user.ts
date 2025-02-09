// types
import type { Schema } from 'mongoose'

export type UserDataType = {
  name: string
  email: string
  picture: string
  username: string
  password: string
  role: 'owner' | 'employee'
  _id: Schema.Types.ObjectId
  business: Schema.Types.ObjectId
  status: 'active' | 'inactive' | 'pending' | 'delete'
}
