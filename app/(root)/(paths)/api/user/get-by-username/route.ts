// services
import { LoginService } from '@/_lib/database/services/auth'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const user = await LoginService(body.username)

  if (!user) return Response.json({ error: 'User not found' })
  return Response.json(user)
}
