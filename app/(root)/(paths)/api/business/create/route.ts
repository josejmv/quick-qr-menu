// services
import { createBusiness } from '@/_lib/database/services/business'
import { generateMenu } from '@/_lib/database/services/menu'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const business = await createBusiness(body)
  await generateMenu(business._id)

  return Response.json(business)
}
