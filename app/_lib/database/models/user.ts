// main tools
import mongoose from 'mongoose'

// types
import type { UserDataType } from '@/_types/models/user'

const UserSchema = new mongoose.Schema<UserDataType>({
  name: {
    default: '',
    type: String,
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
  },
  email: {
    default: '',
    type: String,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Por favor ingresa un email válido',
    ],
  },
  username: {
    type: String,
    unique: true,
    maxlength: [40, 'El nombre de usuario no puede tener más de 40 caracteres'],
    match: [
      /^[a-zA-Z0-9]+$/,
      'El nombre de usuario solo puede tener letras y números',
    ],
  },
  password: {
    type: String,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número',
    ],
  },
  business: {
    ref: 'Business',
    type: mongoose.Schema.Types.ObjectId,
  },
  picture: { type: String, default: 'no-photo.jpg' },
  role: { type: String, default: 'owner', enum: ['owner', 'employee'] },
})

export default mongoose.models.User ||
  mongoose.model<UserDataType>('User', UserSchema)
