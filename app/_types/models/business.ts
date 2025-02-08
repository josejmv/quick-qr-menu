// types
import type { UserDataType } from './user'
import type { Schema } from 'mongoose'

export type BusinessDataType = {
  _id: string
  name: string
  slug: string
  description: string
  menu: Schema.Types.ObjectId
  owner: Schema.Types.ObjectId
  employees: Schema.Types.ObjectId[]
}

export type UpdateBusinessDataType = {
  name?: string
  slug?: string
  description?: string
  menu?: Schema.Types.ObjectId
  $push?: { employees?: UserDataType }
}
