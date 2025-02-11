// types
import type { Schema } from 'mongoose'

export type OrderedDishDataType = {
  _id: string
  quantity: number
  dish: Schema.Types.ObjectId
  order: Schema.Types.ObjectId
}

export type UpdateOrderedDishDataType = {
  $set?: { quantity?: number }
}
