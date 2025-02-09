// types
import type { Schema } from 'mongoose'

export type TableDataType = {
  name: string
  qrCode: string
  _id: Schema.Types.ObjectId
  orders: Schema.Types.ObjectId[]
  business: Schema.Types.ObjectId
}
