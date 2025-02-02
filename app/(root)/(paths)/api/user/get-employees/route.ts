// services
import { getUsersByBusinessId } from '@/_lib/database/services/user'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const users = await getUsersByBusinessId(body.businessId)

  if (!users) return Response.json({ error: 'Users not found' })
  return Response.json(users)
}
