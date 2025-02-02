// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { redirect } from 'next/navigation'

// components
import { UsersTable } from './_components/users-table'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

type EmployeesPageProps = {
  params: Promise<{ business: string }>
}

const EmployeesPage: NextPage<EmployeesPageProps> = async ({ params }) => {
  const { business: slug } = await params

  const business = await axiosInstance.post<BusinessDataType>(
    `/api/business/get-by-slug`,
    { slug }
  )
  if (!business.data._id) redirect('/crear-negocio')

  const employees = await axiosInstance.post(`/api/user/get-employees`, {
    businessId: business.data._id,
  })

  return (
    <main className='flex flex-col gap-5'>
      <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
        <h2 className='text-2xl font-bold'>Empleados</h2>
        <p>
          En esta sección podrás ver y gestionar a los empleados de tu negocio.
        </p>

        <div className='mt-4'>
          <UsersTable data={employees.data} />
        </div>
      </section>
    </main>
  )
}

export default EmployeesPage
