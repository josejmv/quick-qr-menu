// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { getServerSession } from 'next-auth'

// utils
import { authOptions } from '@/(root)/(paths)/api/auth/[...nextauth]'

// components
import { BuildingOfficeIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Card } from '@/_components/molecules/card'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

const MyBusinessesPage: NextPage = async () => {
  const session = await getServerSession(authOptions)

  const businesses = await axiosInstance.post<BusinessDataType[]>(
    `/api/business/get-all`,
    { ownerId: session?.user._id }
  )

  return (
    <section className='bg-white p-8 rounded-2xl drop-shadow-md'>
      <h2 className='text-2xl font-bold'>Mis negocios</h2>
      <p>
        Aquí podrás gestionar todos tus negocios, desde la creación hasta la
        eliminación.
      </p>
      <br />

      <article className='grid grid-cols-4 gap-2'>
        {businesses.data.map((business) => (
          <Card
            key={business._id}
            label={business.name}
            Icon={BuildingOfficeIcon}
            actionLabel='Ir al negocio'
            description={business.description}
            href={`/${business.slug}/dashboard`}
          />
        ))}
        <Card
          Icon={PlusIcon}
          href='/crear-negocio'
          label='Agregar negocio'
          actionLabel='Crear un nuevo negocio'
          description='Crea un nuevo negocio y comienza a gestionarlo.'
        />
      </article>
    </section>
  )
}

export default MyBusinessesPage
