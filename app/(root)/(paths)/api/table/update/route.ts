// services
import { updateTable } from '@/_lib/database/services/table'

export async function POST(req: Request) {
  const body = await req.json()
  const table = await updateTable(body)

  if (!table._id) {
    const [key, value] = Object.entries(table)[0]

    return Response.json({
      error: `${key}:${
        (value as { properties?: { message?: string } })?.properties?.message ||
        value
      }`,
    })
  }

  return Response.json(table)
}
