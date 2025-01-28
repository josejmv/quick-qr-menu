// services
import { findBusinessBySlug } from '@/_lib/database/services/business'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const business = await findBusinessBySlug(body.slug)

  if (business) return Response.json(business)
  else return Response.json({ error: 'Business not found' })
}
