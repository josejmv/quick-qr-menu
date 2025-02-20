// utils
import { SubscriptionActions } from '@/_commons/subscription-actions-enum'

// services
import { updateOrder } from '@/_lib/database/services/order'

// libs
import { pusherServer } from '@/_lib/subscription/init'

export async function POST(req: Request) {
  const body = await req.json()

  const dish = await updateOrder({
    orderId: body.orderId,
    data: { status: 'processing' },
  })

  pusherServer.trigger(`order-${body.orderId}`, SubscriptionActions.SEND, {
    data: dish,
  })

  return Response.json({ success: true })
}
