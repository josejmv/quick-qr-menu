// main tools
import mongoose from 'mongoose'

// types
import type { OrderDataType } from '@/_types/models/order'

const OrderSchema = new mongoose.Schema<OrderDataType>({
  bill: { ref: 'Bill', type: mongoose.Schema.Types.ObjectId },
  dishes: [{ ref: 'Dish', type: mongoose.Schema.Types.ObjectId }],
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
  },
})

export default mongoose.models.Order ||
  mongoose.model<OrderDataType>('Order', OrderSchema)
