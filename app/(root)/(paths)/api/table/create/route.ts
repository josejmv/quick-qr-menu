// services
import { updateBusiness } from '@/_lib/database/services/business'
import { createTable } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const body = await req.json()
  const table = await createTable(body)

  if (!table._id) {
    const [key, value] = Object.entries(table)[0]

    return Response.json({
      error: `${key}:${
        (value as { properties?: { message?: string } })?.properties?.message ||
        value
      }`,
    })
  } else {
    await updateBusiness({
      businessId: body.business,
      data: { $push: { tables: table._id } },
    })
    return Response.json(table)
  }
}
