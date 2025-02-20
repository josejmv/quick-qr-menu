// services
import { updateDish } from '@/_lib/database/services/dish'

export async function POST(req: Request) {
  const body = await req.json()
  const dish = await updateDish(body)

  return Response.json(dish)
}
