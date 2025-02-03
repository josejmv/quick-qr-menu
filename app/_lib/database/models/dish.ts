// main tools
import mongoose from 'mongoose'

// types
import type { DishDataType } from '@/_types/models/dish'

const DishSchema = new mongoose.Schema<DishDataType>({
  name: {
    type: String,
    required: [true, 'Por favor provea un nombre'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
  },
  visible: { type: Boolean, default: true },
  basePrice: {
    type: Number,
    required: [true, 'Por favor provea un precio base'],
  },
  description: {
    type: String,
    required: [true, 'Por favor provea una descripción'],
    maxlength: [350, 'La descripción no puede tener más de 350 caracteres'],
  },
  currentPrice: {
    type: Number,
    required: [true, 'Por favor provea un precio actual'],
  },
  category: {
    ref: 'DishCategory',
    type: mongoose.Schema.Types.ObjectId,
  },
  menu: { ref: 'Menu', required: true, type: mongoose.Schema.Types.ObjectId },
})

export default mongoose.models.Dish ||
  mongoose.model<DishDataType>('Dish', DishSchema)
