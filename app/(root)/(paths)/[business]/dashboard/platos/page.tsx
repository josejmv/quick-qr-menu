// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { redirect } from 'next/navigation'

// components
import { DishesTable } from './_components/dishes-table'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

type DishesPageProps = {
  params: Promise<{ business: string }>
}

const DishesPage: NextPage<DishesPageProps> = async ({ params }) => {
  const { business: slug } = await params

  const business = await axiosInstance.post<BusinessDataType>(
    `/api/business/get-by-slug`,
    { slug }
  )
  if (!business.data._id) redirect('/crear-negocio')

  const dishes = await axiosInstance.post(`/api/dish/get-all`, {
    menuId: business.data.menu,
  })

  return (
    <main className='flex flex-col gap-5'>
      <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
        <h2 className='text-2xl font-bold'>Platos</h2>
        <p>En esta sección podrás ver y gestionar los platos de tu menú.</p>

        <div className='mt-4'>
          <DishesTable business={business.data} dishes={dishes.data} />
        </div>
      </section>
    </main>
  )
}

export default DishesPage
