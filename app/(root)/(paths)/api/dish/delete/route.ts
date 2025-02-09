// services
import { deleteDish } from '@/_lib/database/services/dish'
import { updateMenu } from '@/_lib/database/services/menu'

export async function POST(req: Request) {
  const { dishId, menuId } = await req.json()
  const dish = await deleteDish(dishId)

  await updateMenu({ menuId: menuId, data: { $pull: { dishes: dishId } } })

  return Response.json(dish)
}
