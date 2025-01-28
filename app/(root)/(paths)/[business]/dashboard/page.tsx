// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { redirect } from 'next/navigation'

// components
import { FinishBusinessSetup } from './_components/finish-business-setup'
import { QuickActions } from './_components/quick-actions'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

type BusinessPageProps = {
  params: Promise<{ business: string }>
}

const BusinessPage: NextPage<BusinessPageProps> = async ({ params }) => {
  const { business: slug } = await params

  const business = await axiosInstance.post<BusinessDataType>(
    `/api/business/get-by-slug`,
    { slug }
  )
  if (!business.data._id) redirect('/crear-negocio')

  return (
    <main className='flex flex-col gap-5'>
      <FinishBusinessSetup business={business.data} />
      <QuickActions business={business.data} />
    </main>
  )
}

export default BusinessPage
