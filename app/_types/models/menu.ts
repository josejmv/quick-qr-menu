// types
import type { Schema } from 'mongoose'

export type MenuDataType = {
  _id: Schema.Types.ObjectId
  business: Schema.Types.ObjectId
  dishes: Schema.Types.ObjectId[]
}

export type UpdateMenuDataType = {
  $push?: { dishes?: Schema.Types.ObjectId[] }
  $pull?: { dishes?: Schema.Types.ObjectId[] }
}
