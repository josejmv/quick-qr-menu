// services
import { createDish } from '@/_lib/database/services/dish'
import { updateMenu } from '@/_lib/database/services/menu'

export async function POST(req: Request) {
  const body = await req.json()
  const dish = await createDish(body)

  await updateMenu({ menuId: body.menu, data: { $push: { dishes: dish._id } } })

  return Response.json(dish)
}
