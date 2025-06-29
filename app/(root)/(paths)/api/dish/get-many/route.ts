// services
import { getDishesByManyIds } from '@/_lib/database/services/dish'

export async function POST(req: Request) {
  const body = await req.json()

  const dishes = await getDishesByManyIds(body.dishIds)

  if (!dishes) return Response.json({ error: 'Dishes not found' })
  return Response.json(dishes)
}
