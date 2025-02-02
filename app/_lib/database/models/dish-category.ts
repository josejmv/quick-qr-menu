// main tools
import mongoose from 'mongoose'

// types
import type { DishCategoryDataType } from '@/_types/models/dish-category'

const DishCategorySchema = new mongoose.Schema<DishCategoryDataType>({
  name: {
    type: String,
    required: [true, 'Por favor provea un nombre'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
  },
})

export default mongoose.models.DishCategory ||
  mongoose.model<DishCategoryDataType>('DishCategory', DishCategorySchema)
