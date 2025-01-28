// components
import { FinishBusinessSetup } from './_components/finish-business-setup'
import { QuickActions } from './_components/quick-actions'

// types
import type { NextPage } from 'next'

type BusinessPageProps = {
  params: Promise<{ business: string }>
}

const BusinessPage: NextPage<BusinessPageProps> = async ({ params }) => {
  const { business } = await params

  return (
    <main className='flex flex-col gap-5'>
      <FinishBusinessSetup slug={business} />
      <QuickActions />
    </main>
  )
}

export default BusinessPage
