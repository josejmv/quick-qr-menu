// components
import { BusinessSelector } from './business-selector'
import { SettingsDropdown } from './settings-dropdown'

// types
import type { FC } from 'react'

type NavbarProps = {
  slug: string
}

export const Navbar: FC<NavbarProps> = async ({ slug }) => {
  return (
    <header className='bg-white p-4 rounded-md drop-shadow-md flex items-center justify-between'>
      <div className='flex items-center'>
        <BusinessSelector slug={slug} />
        <SettingsDropdown slug={slug} />
      </div>
    </header>
  )
}
