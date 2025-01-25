// main tools
import mongoose from 'mongoose'

// types
import type { UserDataType } from '@/_types/models/user'

const UserSchema = new mongoose.Schema<UserDataType>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email'],
  },
  picture: { type: String, default: 'no-photo.jpg' },
  role: { type: String, default: 'employee', enum: ['owner', 'employee'] },
})

export default mongoose.models.User ||
  mongoose.model<UserDataType>('User', UserSchema)
