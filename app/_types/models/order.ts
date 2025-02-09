// types
import type { Schema } from 'mongoose'

export type OrderDataType = {
  _id: string
  bill: Schema.Types.ObjectId
  dishes: Schema.Types.ObjectId[]
  status: 'pending' | 'completed' | 'cancelled'
}
