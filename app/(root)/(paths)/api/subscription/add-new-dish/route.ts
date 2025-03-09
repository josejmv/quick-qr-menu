// utils
import { SubscriptionActions } from '@/_commons/subscription-actions-enum'

// services
import { createOrderedDish } from '@/_lib/database/services/ordered-dish'
import { updateOrder } from '@/_lib/database/services/order'

// libs
import { pusherServer } from '@/_lib/subscription/init'

// types
import { OrderedDishDataType } from '@/_types/models/ordered-dish'

export async function POST(req: Request) {
  const body = await req.json()
  const createOrderedDishBody = {
    dish: body.dishId,
    order: body.orderId,
    quantity: body.quantity,
  }
  const orderedDish = await createOrderedDish(
    createOrderedDishBody as OrderedDishDataType
  )

  await updateOrder({
    orderId: body.orderId,
    data: { $push: { orderedDishes: orderedDish._id } },
  })

  pusherServer.trigger(`order-${body.orderId}`, SubscriptionActions.ADD, {
    data: orderedDish,
  })

  return Response.json({ success: true })
}
