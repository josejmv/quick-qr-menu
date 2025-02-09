// services
import { findBusinessBySlug } from '@/_lib/database/services/business'

export async function POST(req: Request) {
  const body = await req.json()
  const business = await findBusinessBySlug(body.slug)

  if (business) return Response.json(business)
  else return Response.json({ error: 'Business not found' })
}
