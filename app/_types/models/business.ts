// types
import type { Schema } from 'mongoose'

export type BusinessDataType = {
  name: string
  slug: string
  description: string
  _id: Schema.Types.ObjectId
  menu: Schema.Types.ObjectId
  owner: Schema.Types.ObjectId
  tables: Schema.Types.ObjectId[]
  employees: Schema.Types.ObjectId[]
}

export type UpdateBusinessDataType = {
  name?: string
  slug?: string
  description?: string
  menu?: Schema.Types.ObjectId
  $pull?: { employees?: Schema.Types.ObjectId; tables?: Schema.Types.ObjectId }
  $push?: { employees?: Schema.Types.ObjectId; tables?: Schema.Types.ObjectId }
}
