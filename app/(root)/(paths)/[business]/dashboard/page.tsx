'use client'

// main tools
import { signOut } from 'next-auth/react'

// types
import type { NextPage } from 'next'

const BusinessPage: NextPage = () => {
  return (
    <button
      type='button'
      onClick={() => signOut({ callbackUrl: '/iniciar-sesion' })}
    >
      hola
    </button>
  )
}

export default BusinessPage
