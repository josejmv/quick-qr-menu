// services
import { getMenuByBusinessId } from '@/_lib/database/services/menu'

export async function POST(req: Request) {
  const body = await req.json()
  const menu = await getMenuByBusinessId(body.businessId)

  if (menu) return Response.json(menu)
  else return Response.json({ error: 'Menu not found' })
}
