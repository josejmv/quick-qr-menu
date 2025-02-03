// main tools
import { axiosInstance } from '@/_lib/axios-instance'

// components
import { UserPlusIcon, BookOpenIcon } from '@heroicons/react/24/solid'
import { Card } from '@/_components/molecules/card'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { MenuDataType } from '~/app/_types/models/menu'
import type { FC } from 'react'

type FinishBusinessSetupProps = {
  business: BusinessDataType
}

export const FinishBusinessSetup: FC<FinishBusinessSetupProps> = async ({
  business,
}) => {
  const menu = await axiosInstance.post<MenuDataType>(
    `/api/menu/get-by-business-id`,
    {
      businessId: business._id,
    }
  )

  if (business.employees.length > 0 && menu.data.dishes.length > 0) return null

  return (
    <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
      <h2 className='text-2xl font-bold'>Termina de configurar tu negocio</h2>
      <p className='text-secondary-content'>
        Completa la información de tu negocio para comenzar a utilizar la
        plataforma.
      </p>
      <br />
      <article className='grid grid-cols-2 gap-8'>
        {business.employees.length === 0 && (
          <Card
            Icon={UserPlusIcon}
            label='Gestiona a tus empleados'
            actionLabel='Ve y gestiona tus empleados'
            href={`/${business.slug}/dashboard/empleados`}
            description='Agrega empleados que te ayudaran a gestionar tu negocio y atender a tus clientes'
          />
        )}
        {menu.data.dishes.length === 0 && (
          <Card
            Icon={BookOpenIcon}
            label='Gestiona tu menú'
            actionLabel='Ve y gestiona tu menú'
            href={`/${business.slug}/dashboard/menu`}
            description='Agrega platos a tu menú para que tus clientes puedan verlos y ordenarlos'
          />
        )}
      </article>
    </section>
  )
}
