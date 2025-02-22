// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { redirect } from 'next/navigation'

// components
import { OrdersTable } from './_components/tables-table'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { TableDataType } from '@/_types/models/table'
import type { NextPage } from 'next'

type OrdersPageProps = {
  params: Promise<{ business: string }>
}

const OrdersPage: NextPage<OrdersPageProps> = async ({ params }) => {
  const { business: slug } = await params

  const business = await axiosInstance.post<BusinessDataType>(
    `/api/business/get-by-slug`,
    { slug }
  )
  if (!business.data._id) redirect('/crear-negocio')

  const tables = await axiosInstance.post(`/api/table/get-all`, {
    businessId: business.data._id,
  })
  const orders = await axiosInstance.post(`/api/order/get-by-table-ids`, {
    tableIds: tables.data.map((table: TableDataType) => table._id),
  })

  return (
    <main className='flex flex-col gap-5'>
      <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
        <h2 className='text-2xl font-bold'>Ordenes</h2>
        <p>
          Aquí podrás ver todas las ordenes que han sido realizadas en tu
          negocio.
        </p>

        <div className='mt-4'>
          <OrdersTable business={business.data} orders={orders.data} />
        </div>
      </section>
    </main>
  )
}

export default OrdersPage
