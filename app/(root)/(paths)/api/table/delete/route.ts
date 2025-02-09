// services
import { updateBusiness } from '@/_lib/database/services/business'
import { deleteTable } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const { tableId, businessId } = await req.json()
  const table = await deleteTable(tableId)

  await updateBusiness({ businessId, data: { $pull: { tables: tableId } } })

  return Response.json(table)
}
