// services
import { getOrdersByTableIds } from '@/_lib/database/services/order'

export async function POST(req: Request) {
  const body = await req.json()
  const orders = await getOrdersByTableIds(body.tableIds)

  if (orders) return Response.json(orders)
  else return Response.json({ error: 'Orders not found' })
}
