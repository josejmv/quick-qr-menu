// providers
import { PushNotificationProvider } from '@/_contexts/notification/provider'

// components
import { Sidebar } from './dashboard/components/sidebar'
import { Navbar } from './dashboard/components/navbar'

// types
import type { FC, ReactNode } from 'react'

type BusinessLayoutProps = {
  children: ReactNode
}

const BusinessLayout: FC<BusinessLayoutProps> = ({ children }) => (
  <PushNotificationProvider>
    <div className='flex gap-4 min-h-screen'>
      <Sidebar />
      <div className='p-4 w-full'>
        <Navbar />
        <br />
        {children}
      </div>
    </div>
  </PushNotificationProvider>
)

export default BusinessLayout
