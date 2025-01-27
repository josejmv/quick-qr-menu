'use client'

// main tools
import { signOut } from 'next-auth/react'

// components
import { Dropdown } from '@/_components/atoms/dropdown'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { Button } from '@/_components/atoms/button'
import Link from 'next/link'

// types
import type { FC } from 'react'

type SettingsDropdownProps = {
  slug: string
}

export const SettingsDropdown: FC<SettingsDropdownProps> = ({ slug }) => {
  return (
    <Dropdown.Wrapper>
      <Dropdown.Trigger>
        <Cog6ToothIcon className='size-5 ms-3 cursor-pointer' />
      </Dropdown.Trigger>
      <Dropdown.Content className='p-2'>
        <Link href={`/${slug}/configuracion`}>
          <Button
            variant='GHOST'
            color='TERTIARY'
            className='w-full justify-start'
          >
            Configuración
          </Button>
        </Link>
        <Button
          variant='GHOST'
          color='TERTIARY'
          className='w-full justify-start'
          onClick={() => signOut({ callbackUrl: '/iniciar-sesion' })}
        >
          Cerrar sesión
        </Button>
      </Dropdown.Content>
    </Dropdown.Wrapper>
  )
}
