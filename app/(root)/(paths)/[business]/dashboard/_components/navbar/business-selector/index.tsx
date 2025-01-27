// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

// components
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Dropdown } from '@/_components/atoms/dropdown'
import { Button } from '@/_components/atoms/button'

// utils
import { authOptions } from '@/(root)/(paths)/api/auth/[...nextauth]'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

type BusinessSelectorProps = {
  slug: string
}

export const BusinessSelector: FC<BusinessSelectorProps> = async ({ slug }) => {
  const session = await getServerSession(authOptions)
  const { data: businesses } = await axiosInstance.post<BusinessDataType[]>(
    '/api/business/get-all',
    { ownerId: session?.user._id }
  )
  const { data: business } = await axiosInstance.post<BusinessDataType>(
    '/api/business/get-by-slug',
    { slug }
  )

  return (
    <Dropdown.Wrapper>
      <Dropdown.Trigger className='max-w-96 w-full'>
        <Button variant='OUTLINE' color='TERTIARY'>
          {business.name} <ChevronDownIcon className='size-4 ms-2' />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content className='p-2'>
        {businesses.map((businessItem) => (
          <Link key={businessItem._id} href={`/${businessItem.slug}/dashboard`}>
            <Button
              variant='GHOST'
              color='TERTIARY'
              className='w-full justify-start'
            >
              {businessItem.name}
            </Button>
          </Link>
        ))}
        <Link href='/crear-negocio'>
          <Button
            variant='GHOST'
            color='TERTIARY'
            key={business._id}
            className='w-full justify-start'
          >
            Crear nuevo negocio <PlusIcon className='size-5 ps-2' />
          </Button>
        </Link>
      </Dropdown.Content>
    </Dropdown.Wrapper>
  )
}
