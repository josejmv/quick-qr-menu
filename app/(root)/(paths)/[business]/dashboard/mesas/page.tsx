// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { redirect } from 'next/navigation'

// components
import { TablesTable } from './_components/tables-table'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

type TablesPageProps = {
  params: Promise<{ business: string }>
}

const TablesPage: NextPage<TablesPageProps> = async ({ params }) => {
  const { business: slug } = await params

  const business = await axiosInstance.post<BusinessDataType>(
    `/api/business/get-by-slug`,
    { slug }
  )
  if (!business.data._id) redirect('/crear-negocio')

  const tables = await axiosInstance.post(`/api/table/get-all`, {
    businessId: business.data._id,
  })

  return (
    <main className='flex flex-col gap-5'>
      <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
        <h2 className='text-2xl font-bold'>Mesas</h2>
        <p>
          Aquí podrás ver todas las mesas de tu negocio, así como gestionarlas
          de forma rápida y sencilla
        </p>

        <div className='mt-4'>
          <TablesTable business={business.data} tables={tables.data} />
        </div>
      </section>
    </main>
  )
}

export default TablesPage
