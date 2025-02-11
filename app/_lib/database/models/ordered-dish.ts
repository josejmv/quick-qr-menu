// main tools
import mongoose from 'mongoose'

// types
import type { OrderedDishDataType } from '@/_types/models/ordered-dish'

const OrderSchema = new mongoose.Schema<OrderedDishDataType>({
  quantity: { type: Number, required: true },
  dish: { ref: 'Dish', type: mongoose.Schema.Types.ObjectId },
  order: { ref: 'Order', type: mongoose.Schema.Types.ObjectId },
})

export default mongoose.models.OrderedDish ||
  mongoose.model<OrderedDishDataType>('OrderedDish', OrderSchema)
