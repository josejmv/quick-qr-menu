// types
import type { Schema } from 'mongoose'

export type TableDataType = {
  _id: string
  name: string
  orders: Schema.Types.ObjectId[]
  business: Schema.Types.ObjectId
}

export type UpdateTableDataType = {
  name: string
}
