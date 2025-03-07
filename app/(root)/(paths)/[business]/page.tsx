// main tools
import { axiosInstance } from '@/_lib/axios-instance'

// components
import { MenuView } from './_components/menu/view'
import Image from 'next/image'

// providers
import { SubscriptionProvider } from '@/_contexts/subscription/provider'

// types
import type { NextPage } from 'next'

type PublicMenuPageProps = {
  params: Promise<{ business: string }>
  searchParams: Promise<{ tableId: string }>
}

const PublicMenuPage: NextPage<PublicMenuPageProps> = async ({
  params,
  searchParams,
}) => {
  const queryParams = await searchParams
  const { business: slug } = await params
  const business = await axiosInstance.post('/api/business/get-by-slug', {
    slug,
  })
  const dishes = await axiosInstance.post('/api/dish/get-all-visible', {
    menuId: business.data.menu,
  })
  const openedOrder = await axiosInstance.post('/api/order/get-opened-order', {
    tableId: queryParams.tableId,
  })
  const orderedDishes = openedOrder.data._id
    ? await axiosInstance.post('/api/ordered-dish/get-all-by-order-id', {
        orderId: openedOrder.data._id,
      })
    : { data: [] }

  const order = openedOrder.data._id
    ? { data: { ...openedOrder.data, orderedDishes: orderedDishes.data } }
    : await axiosInstance.post('/api/order/create', {
        orderedDishes: [],
        status: 'pending',
        table: queryParams.tableId,
      })

  return (
    <SubscriptionProvider>
      <main className='h-screen flex justify-center items-center relative'>
        <Image
          fill
          priority
          sizes='100vw'
          alt='background-picture'
          src='/images/login-page/picture.jpg'
          className='object-cover object-center brightness-125'
        />
        <div className='max-w-screen-lg w-full relative'>
          <MenuView dishes={dishes.data} order={order.data} />
        </div>
      </main>
    </SubscriptionProvider>
  )
}

export default PublicMenuPage
