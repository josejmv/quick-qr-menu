// services
import { updateBusiness } from '@/_lib/database/services/business'
import { deleteUser } from '@/_lib/database/services/user'

export async function POST(req: Request) {
  const { userId, businessId } = await req.json()
  const user = await deleteUser(userId)

  await updateBusiness({
    businessId: businessId,
    data: { $pull: { employees: userId } },
  })

  return Response.json(user)
}
