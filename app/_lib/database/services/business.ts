// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import BusinessModel from '@/_lib/database/models/business'

// types
import type { BusinessDataType } from '~/app/_types/models/business'

export const findBusinesses = async (ownerId: string | undefined) => {
  await dbConnect()
  const business = await BusinessModel.find({ owner: ownerId })
  if (!business) return undefined
  else return JSON.parse(JSON.stringify(business)) as BusinessDataType[]
}
