// types
import type { Schema } from 'mongoose'

export type DishDataType = {
  _id: string
  name: string
  visible: boolean
  basePrice: number
  description: string
  currentPrice: number
  menu: Schema.Types.ObjectId
  category: Schema.Types.ObjectId
}
