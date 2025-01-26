// main tools
import mongoose from 'mongoose'

// types
import type { BusinessDataType } from '@/_types/models/business'

const BusinessSchema = new mongoose.Schema<BusinessDataType>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Please provide a slug'],
    maxlength: [50, 'Slug can not be more than 50 characters'],
  },
  owner: { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  employees: [
    { ref: 'User', required: true, type: mongoose.Schema.Types.ObjectId },
  ],
})

export default mongoose.models.Business ||
  mongoose.model<BusinessDataType>('Business', BusinessSchema)
