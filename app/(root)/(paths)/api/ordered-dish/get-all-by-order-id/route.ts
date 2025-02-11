// services
import { getAllOrderedDishByOrderId } from '@/_lib/database/services/ordered-dish'

export async function POST(req: Request) {
  const body = await req.json()
  const orderedDishResponse = await getAllOrderedDishByOrderId(body.orderId)

  if (orderedDishResponse) return Response.json(orderedDishResponse)
  else return Response.json({ error: 'Orders not found' })
}
