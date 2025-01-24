// types
import type { FC } from 'react'

export const Navbar: FC = async () => {
  return (
    <header className='bg-white p-4 rounded-md drop-shadow-md flex items-center justify-between'>
      <p className='text-2xl text-primary-shade-darken-16 mr-3'>Welcome back</p>
    </header>
  )
}
