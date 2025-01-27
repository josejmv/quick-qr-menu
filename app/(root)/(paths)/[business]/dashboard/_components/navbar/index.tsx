// main tools
import { axiosInstance } from '@/_lib/axios-instance'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

type NavbarProps = {
  slug: string
}

export const Navbar: FC<NavbarProps> = async ({ slug }) => {
  const { data } = await axiosInstance.post<BusinessDataType>(
    '/api/business/get-by-slug',
    { slug }
  )

  return (
    <header className='bg-white p-4 rounded-md drop-shadow-md flex items-center justify-between'>
      <p className='text-2xl text-primary-shade-darken-16 mr-3'>{data.name}</p>
    </header>
  )
}
