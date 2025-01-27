// providers
import { PushNotificationProvider } from '@/_contexts/notification/provider'

// components
import { Sidebar } from './dashboard/_components/sidebar'
import { Navbar } from './dashboard/_components/navbar'

// types
import type { FC, PropsWithChildren } from 'react'

const BusinessLayout: FC<PropsWithChildren> = ({ children }) => (
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
