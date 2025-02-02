// services
import {
  createBusiness,
  updateBusiness,
} from '@/_lib/database/services/business'
import { generateMenu } from '@/_lib/database/services/menu'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const business = await createBusiness(body)
  const menu = await generateMenu(business._id)
  await updateBusiness({ businessId: business._id, data: { menu: menu._id } })

  return Response.json(business)
}
