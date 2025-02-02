// main tools
import mongoose from 'mongoose'

// types
import type { MenuDataType } from '@/_types/models/menu'

const MenuSchema = new mongoose.Schema<MenuDataType>({
  business: {
    ref: 'Business',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  dishes: [{ ref: 'Dish', type: mongoose.Schema.Types.ObjectId }],
})

export default mongoose.models.Menu ||
  mongoose.model<MenuDataType>('Menu', MenuSchema)
