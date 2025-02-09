// components
import { Sidebar } from './dashboard/_components/sidebar'
import { Navbar } from './dashboard/_components/navbar'

// types
import type { FC, PropsWithChildren } from 'react'

interface BusinessLayoutProps extends PropsWithChildren {
  params: Promise<{ business: string }>
}

const BusinessLayout: FC<BusinessLayoutProps> = async ({
  children,
  ...props
}) => {
  const params = await props.params

  return (
    <div className='flex gap-4 min-h-screen'>
      <Sidebar slug={params.business} />
      <div className='p-4 w-full'>
        <Navbar slug={params.business} />
        <br />
        {children}
      </div>
    </div>
  )
}

export default BusinessLayout
