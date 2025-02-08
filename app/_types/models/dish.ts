// types
import type { Schema } from 'mongoose'

export type DishDataType = {
  _id: string
  name: string
  visible: boolean
  description: string
  menu: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
  price: [{ basePrice: number; discountPrice: number; currency: 'COP' | 'USD' }]
}
