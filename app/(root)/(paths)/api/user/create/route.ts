// services
import { createUser } from '@/_lib/database/services/user'

// database
import dbConnect from '@/_lib/database/db-connect'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const response = await createUser(body)

  if (!response._id) {
    const [key, value] = Object.entries(response)[0]

    return Response.json({
      error: `${key}:${
        (value as { properties?: { message?: string } })?.properties?.message ||
        value
      }`,
    })
  }
  return Response.json(response)
}
