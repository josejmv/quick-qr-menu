// utils
import { SubscriptionActions } from '@/_commons/subscription-actions-enum'

// services
import { updateOrderedDish } from '@/_lib/database/services/ordered-dish'

// libs
import { pusherServer } from '@/_lib/subscription/init'

export async function POST(req: Request) {
  const body = await req.json()

  const orderedDishResponse = await updateOrderedDish({
    orderedDishId: body.orderedDishId,
    data: { $set: { quantity: body.quantity } },
  })

  pusherServer.trigger(
    `order-${body.orderId}`,
    SubscriptionActions.UPDATE_QUANTITY,
    { data: orderedDishResponse }
  )

  return Response.json({ success: true })
}
