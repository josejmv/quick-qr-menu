// main tools
import mongoose from 'mongoose'

// types
import type { BillDataType } from '@/_types/models/bill'

const BillSchema = new mongoose.Schema<BillDataType>({
  table: {
    ref: 'Table',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled', 'debt'],
  },
  total: { type: Number, required: true },
  order: { ref: 'Order', type: mongoose.Schema.Types.ObjectId },
  paymentMethod: { type: String, required: true, enum: ['cash', 'transfer'] },
})

export default mongoose.models.Bill ||
  mongoose.model<BillDataType>('Bill', BillSchema)
