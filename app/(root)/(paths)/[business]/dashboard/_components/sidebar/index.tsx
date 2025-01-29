'use client'

// main tools
import { signOut } from 'next-auth/react'

// components
import { Button } from '@/_components/atoms/button'
import Link from 'next/link'

// icons
import {
  HomeIcon,
  UserIcon,
  PowerIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid'

// types
import type { FC } from 'react'

type SidebarProps = {
  slug: string
}

export const Sidebar: FC<SidebarProps> = ({ slug }) => (
  <aside className='bg-white p-8 rounded-r-md drop-shadow-md flex flex-col justify-between'>
    <div>
      <Link title='Dashboard' href={`/${slug}/dashboard`}>
        <Button variant='GHOST' color='TERTIARY' className='mb-4'>
          <HomeIcon className='w-6 h-6' />
        </Button>
      </Link>
      <Link title='Empleados' href={`/${slug}/dashboard/empleados`}>
        <Button variant='GHOST' color='TERTIARY' className='mb-4'>
          <UserIcon className='w-6 h-6' />
        </Button>
      </Link>
      <Link title='Grupos' href={`/${slug}/dashboard`}>
        <Button variant='GHOST' color='TERTIARY' className='mb-4'>
          <UserGroupIcon className='w-6 h-6' />
        </Button>
      </Link>
      <Link title='Rutinas' href={`/${slug}/dashboard`}>
        <Button variant='GHOST' color='TERTIARY' className='mb-4'>
          <ShieldExclamationIcon className='w-6 h-6' />
        </Button>
      </Link>
      <Link title='Recetas' href={`/${slug}/dashboard`}>
        <Button variant='GHOST' color='TERTIARY' className='mb-4'>
          <DocumentTextIcon className='w-6 h-6' />
        </Button>
      </Link>
    </div>
    <div>
      <Button
        variant='GHOST'
        color='TERTIARY'
        className='mb-4'
        title='Cerrar sesión'
        onClick={() => signOut({ callbackUrl: '/iniciar-sesion' })}
      >
        <PowerIcon className='w-6 h-6' />
      </Button>
    </div>
  </aside>
)
