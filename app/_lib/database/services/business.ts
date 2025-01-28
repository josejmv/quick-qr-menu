// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import BusinessModel from '@/_lib/database/models/business'

// types
import type { BusinessDataType } from '@/_types/models/business'

export const findBusinessBySlug = async (slug: string) => {
  await dbConnect()
  const business = await BusinessModel.findOne({ slug })
  if (!business) return undefined
  else return JSON.parse(JSON.stringify(business)) as BusinessDataType
}

export const findBusinesses = async (ownerId: string | undefined) => {
  await dbConnect()
  const business = await BusinessModel.find({ owner: ownerId })
  if (!business) return undefined
  else return JSON.parse(JSON.stringify(business)) as BusinessDataType[]
}

export const createBusiness = async (business: BusinessDataType) => {
  await dbConnect()
  const businessResponse = await BusinessModel.create(business).catch(
    (error) => error
  )

  if (businessResponse.errors) return businessResponse.errors
  else return JSON.parse(JSON.stringify(businessResponse)) as BusinessDataType[]
}

export const updateBusiness = async (body: {
  businessId: string
  userId: string
}) => {
  await dbConnect()
  const businessResponse = await BusinessModel.findByIdAndUpdate(
    body.businessId,
    { $push: { employees: body.userId } },
    { new: true }
  ).catch((error) => error)

  if (businessResponse.errors) return businessResponse.errors
  else return JSON.parse(JSON.stringify(businessResponse)) as BusinessDataType[]
}
