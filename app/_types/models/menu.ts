// types
import type { Schema } from 'mongoose'

export type MenuDataType = {
  _id: string
  business: Schema.Types.ObjectId
  dishes: Schema.Types.ObjectId[]
}

export type UpdateMenuDataType = {
  dishes: Schema.Types.ObjectId[]
}
