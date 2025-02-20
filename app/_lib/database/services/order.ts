// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import OrderModel from '@/_lib/database/models/order'

// types
import type { OrderDataType, UpdateOrderDataType } from '@/_types/models/order'

export const createOrder = async (order: OrderDataType) => {
  await dbConnect()

  const orderResponse = await OrderModel.create(order).catch((error) => error)

  if (orderResponse?.data?.error) return orderResponse.data.error
  else if (!orderResponse) return undefined

  return JSON.parse(JSON.stringify(orderResponse)) as OrderDataType
}

export const getOpenedOrderByTableId = async (tableId: string) => {
  await dbConnect()

  const orderResponse = await OrderModel.findOne({
    table: tableId,
    status: { $in: ['processing', 'pending'] },
  }).catch((error) => error)

  if (orderResponse?.data?.error) return orderResponse.data.error
  else if (!orderResponse) return undefined

  return JSON.parse(JSON.stringify(orderResponse)) as OrderDataType
}

export const updateOrder = async (body: {
  orderId: string
  data: UpdateOrderDataType
}) => {
  await dbConnect()

  const orderResponse = await OrderModel.findByIdAndUpdate(
    body.orderId,
    body.data,
    { new: true }
  ).catch((error) => error)

  if (orderResponse?.data?.error) return orderResponse.data.error
  else if (!orderResponse) return undefined

  return JSON.parse(JSON.stringify(orderResponse)) as OrderDataType
}
