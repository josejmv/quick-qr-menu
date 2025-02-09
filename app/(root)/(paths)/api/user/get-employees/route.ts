// services
import { getUsersByBusinessId } from '@/_lib/database/services/user'

export async function POST(req: Request) {
  const body = await req.json()
  const users = await getUsersByBusinessId(body.businessId)

  if (!users) return Response.json({ error: 'Users not found' })
  return Response.json(users)
}
