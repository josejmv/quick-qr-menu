// main tools
import mongoose from 'mongoose'

// types
import type { BusinessDataType } from '@/_types/models/business'

const BusinessSchema = new mongoose.Schema<BusinessDataType>({
  name: {
    type: String,
    required: [true, 'Por favor provea un nombre'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Por favor provea un slug'],
    maxlength: [50, 'El slug no puede tener más de 50 caracteres'],
  },
  description: {
    type: String,
    required: [true, 'Por favor provea una descripción'],
    maxlength: [350, 'La descripción no puede tener más de 350 caracteres'],
  },
  addresses: [
    {
      city: {
        type: String,
        required: [true, 'Por favor provea una ciudad'],
        maxlength: [50, 'La ciudad no puede tener más de 50 caracteres'],
      },
      address: {
        type: String,
        required: [true, 'Por favor provea una dirección'],
        maxlength: [100, 'La dirección no puede tener más de 100 caracteres'],
      },
    },
  ],
  owner: { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  employees: [
    { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  ],
})

export default mongoose.models.Business ||
  mongoose.model<BusinessDataType>('Business', BusinessSchema)
