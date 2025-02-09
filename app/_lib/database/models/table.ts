// main tools
import mongoose from 'mongoose'

// types
import type { TableDataType } from '@/_types/models/table'

const TableSchema = new mongoose.Schema<TableDataType>({
  qrCode: { type: String },
  name: {
    type: String,
    required: [true, 'Por favor provea un nombre'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
  },
  business: {
    ref: 'Business',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  orders: [{ ref: 'Order', type: mongoose.Schema.Types.ObjectId }],
})

export default mongoose.models.Table ||
  mongoose.model<TableDataType>('Table', TableSchema)
