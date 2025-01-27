// services
import { GetAllService } from '@/_lib/database/services/auth'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function GET() {
  await dbConnect()
  const users = await GetAllService()

  if (!users) return Response.json({ error: 'Users not found' })
  return Response.json(users)
}
