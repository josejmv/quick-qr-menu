// types
import type { Schema } from 'mongoose'

export type DishDataType = {
  name: string
  visible: boolean
  description: string
  _id: Schema.Types.ObjectId
  menu: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
  price: [{ basePrice: number; discountPrice: number; currency: 'COP' | 'USD' }]
}
