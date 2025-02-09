// services
import { getTable } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const body = await req.json()
  const table = await getTable(body.id)

  if (!table) return Response.json({ error: 'Table not found' })
  return Response.json(table)
}
