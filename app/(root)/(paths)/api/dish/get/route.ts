// services
import { getDishById } from '@/_lib/database/services/dish'

export async function POST(req: Request) {
  const body = await req.json()

  const dish = await getDishById(body.id)

  if (!dish) return Response.json({ error: 'Dish not found' })
  return Response.json(dish)
}
