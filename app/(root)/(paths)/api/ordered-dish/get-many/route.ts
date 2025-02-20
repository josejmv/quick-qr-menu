// services
import { getOrderedDishesByManyIds } from '@/_lib/database/services/ordered-dish'

export async function POST(req: Request) {
  const body = await req.json()

  const orderedDishes = await getOrderedDishesByManyIds(body.orderedDishIds)

  if (!orderedDishes) return Response.json({ error: 'Dishes not found' })
  return Response.json(orderedDishes)
}
