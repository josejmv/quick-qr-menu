// types
import type { OrderedDishDataType } from './ordered-dish'
import type { Schema } from 'mongoose'

export type OrderDataType = {
  _id: string
  bill: Schema.Types.ObjectId
  table: Schema.Types.ObjectId
  dishes: OrderedDishDataType[]
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export type UpdateOrderDataType = {
  status?: 'pending' | 'processing' | 'completed' | 'cancelled'
  $pull?: { dishes?: { dish: Schema.Types.ObjectId; quantity?: number } }
  $push?: { dishes?: { dish: Schema.Types.ObjectId; quantity?: number } }
}
