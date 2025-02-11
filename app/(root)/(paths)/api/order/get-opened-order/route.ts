// services
import { getOpenedOrderByTableId } from '@/_lib/database/services/order'

export async function POST(req: Request) {
  const body = await req.json()
  const order = await getOpenedOrderByTableId(body.tableId)

  if (order) return Response.json(order)
  else return Response.json({ error: 'Order not found' })
}
