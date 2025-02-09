// types
import type { Schema } from 'mongoose'

export type BillDataType = {
  total: number
  _id: Schema.Types.ObjectId
  table: Schema.Types.ObjectId
  order: Schema.Types.ObjectId
  paymentMethod: 'cash' | 'transfer'
  status: 'pending' | 'completed' | 'cancelled' | 'debt'
}
