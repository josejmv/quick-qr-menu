// services
import { createOrder } from '@/_lib/database/services/order'
import { updateTable } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const body = await req.json()
  const order = await createOrder(body)
  await updateTable({
    tableId: body.table,
    data: { $push: { orders: order._id } },
  })

  return Response.json(order)
}
