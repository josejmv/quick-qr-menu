// main tools
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

// types
import type { NextPage } from 'next'

const CreateBusinessPage: NextPage = async () => {
  const session = await getServerSession(authOptions)

  return <p>create business {session?.user.username}</p>
}

export default CreateBusinessPage
