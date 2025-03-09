// utils
import { SubscriptionActions } from '@/_commons/subscription-actions-enum'

// services
import { removeOrderedDish } from '@/_lib/database/services/ordered-dish'
import { updateOrder } from '@/_lib/database/services/order'

// libs
import { pusherServer } from '@/_lib/subscription/init'

export async function POST(req: Request) {
  const body = await req.json()

  const orderedDish = await removeOrderedDish({
    orderedDishId: body.orderedDishId,
    data: body.quantity === 0 ? {} : { $set: { quantity: body.quantity } },
  })
  if (body.quantity === 0)
    await updateOrder({
      orderId: orderedDish.order,
      data: { $pull: { orderedDishes: orderedDish._id } },
    })

  pusherServer.trigger(`order-${body.orderId}`, SubscriptionActions.REMOVE, {
    data: { ...orderedDish, deleted: body.quantity === 0 },
  })

  return Response.json({ success: true })
}
