// services
import { findBusinesses } from '@/_lib/database/services/business'

export async function POST(req: Request) {
  const body = await req.json()
  const businesses = await findBusinesses(body.ownerId)

  return Response.json(businesses)
}
