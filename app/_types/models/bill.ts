// types
import type { Schema } from 'mongoose'

export type BillDataType = {
  _id: string
  total: number
  table: Schema.Types.ObjectId
  order: Schema.Types.ObjectId
  paymentMethod: 'cash' | 'transfer'
  status: 'pending' | 'completed' | 'cancelled' | 'debt'
}
