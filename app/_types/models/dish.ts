// types
import type { Schema } from 'mongoose'

export type DishDataType = {
  _id: string
  name: string
  visible: boolean
  description: string
  menu: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
  price: {
    _id: string
    basePrice: number
    discountPrice: number
    currency: 'COP' | 'USD'
  }[]
}

export type UpdateDishDataType = {
  name: string
  visible: boolean
  description: string
  category: Schema.Types.ObjectId
  price: { basePrice: number; discountPrice: number; currency: 'COP' | 'USD' }[]
}
