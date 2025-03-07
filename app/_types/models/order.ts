// types
import type { OrderedDishDataType } from './ordered-dish'
import type { Schema } from 'mongoose'

export type OrderDataType = {
  _id: string
  bill: Schema.Types.ObjectId
  table: Schema.Types.ObjectId
  orderedDishes: OrderedDishDataType[]
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export type UpdateOrderDataType = {
  status?: 'pending' | 'processing' | 'completed' | 'cancelled'
  $pull?: {
    dishes?: { orderedDishes: Schema.Types.ObjectId; quantity?: number }
  }
  $push?: {
    dishes?: { orderedDishes: Schema.Types.ObjectId; quantity?: number }
  }
}
