// services
import { getTablesByBusinessId } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const body = await req.json()
  const tables = await getTablesByBusinessId(body.businessId)

  if (!tables) return Response.json({ error: 'Tables not found' })
  return Response.json(tables)
}
