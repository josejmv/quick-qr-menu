// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import OrderedDishModel from '@/_lib/database/models/ordered-dish'

// types
import {
  OrderedDishDataType,
  UpdateOrderedDishDataType,
} from '@/_types/models/ordered-dish'

export const createOrderedDish = async (orderedDish: OrderedDishDataType) => {
  await dbConnect()

  const orderedDishResponse = await OrderedDishModel.create(orderedDish).catch(
    (error) => error
  )

  if (orderedDishResponse?.data?.error) return orderedDishResponse.data.error
  else if (!orderedDishResponse) return undefined

  return JSON.parse(JSON.stringify(orderedDishResponse)) as OrderedDishDataType
}

export const removeOrderedDish = async (body: {
  orderedDishId: string
  data: UpdateOrderedDishDataType
}) => {
  await dbConnect()

  const orderedDishResponse = body.data.$set
    ? await OrderedDishModel.findByIdAndUpdate(body.orderedDishId, body.data, {
        new: true,
      }).catch((error) => error)
    : await OrderedDishModel.findByIdAndDelete(body.orderedDishId, {
        new: true,
      }).catch((error) => error)

  if (orderedDishResponse?.data?.error) return orderedDishResponse.data.error
  else if (!orderedDishResponse) return undefined

  return JSON.parse(
    JSON.stringify(orderedDishResponse)
  ) as OrderedDishDataType[]
}

export const getAllOrderedDishByOrderId = async (orderId: string) => {
  await dbConnect()

  const orderedDishResponse = await OrderedDishModel.find({
    order: orderId,
  }).catch((error) => error)

  if (orderedDishResponse?.data?.error) return orderedDishResponse.data.error
  else if (!orderedDishResponse) return undefined

  return JSON.parse(
    JSON.stringify(orderedDishResponse)
  ) as OrderedDishDataType[]
}

export const updateOrderedDish = async (body: {
  orderedDishId: string
  data: UpdateOrderedDishDataType
}) => {
  await dbConnect()

  const orderedDishResponse = await OrderedDishModel.findByIdAndUpdate(
    body.orderedDishId,
    body.data,
    { new: true }
  ).catch((error) => error)

  if (orderedDishResponse?.data?.error) return orderedDishResponse.data.error
  else if (!orderedDishResponse) return undefined

  return JSON.parse(
    JSON.stringify(orderedDishResponse)
  ) as OrderedDishDataType[]
}
