// services
import { createBusiness } from '@/_lib/database/services/business'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const business = await createBusiness(body)

  return Response.json(business)
}
