'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useEffect, useState } from 'react'

// components
import { Fragment } from 'react'

// types
import type { OrderedDishDataType } from '~/app/_types/models/ordered-dish'
import type { OrderDataType } from '@/_types/models/order'
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type BillProps = {
  orderState: OrderDataType
}

interface formattedOrderedDishesDataType
  extends Omit<OrderedDishDataType, 'dish'> {
  dish: DishDataType
}

export const Bill: FC<BillProps> = ({ orderState }) => {
  const [orderedDishes, setOrderedDishes] =
    useState<formattedOrderedDishesDataType[]>()
  const [currency, setCurrency] = useState('COP')

  const handleFormatPrice = (dish: DishDataType, currency: string) =>
    `${
      dish.price.find((price) => price.currency === currency)?.basePrice ??
      'Sin precio en'
    } ${currency}`

  useEffect(() => {
    ;(async () => {
      const orderedDishes = await axiosInstance.post(
        '/api/ordered-dish/get-many',
        { orderedDishIds: orderState.dishes.map((dish) => dish._id) }
      )
      const dishes = await axiosInstance.post('/api/dish/get-many', {
        dishIds: orderedDishes.data.map(
          (orderedDish: OrderedDishDataType) => orderedDish.dish
        ),
      })

      const formattedOrderedDishes = orderedDishes.data.map(
        (orderedDish: OrderedDishDataType) => {
          const dish = dishes.data.find(
            (dish: DishDataType) =>
              dish._id === (orderedDish.dish as unknown as string)
          )
          return { ...orderedDish, dish }
        }
      )

      setOrderedDishes(formattedOrderedDishes)
    })()
  }, [orderState])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Factura</h1>
        <select
          value={currency}
          onChange={(ev) => setCurrency(ev.target.value)}
        >
          <option value='COP'>COP</option>
          <option value='USD'>USD</option>
        </select>
      </div>
      <br />
      <div className='grid grid-cols-3 gap-3'>
        <p className='text-xl font-semibold text-center'>Producto</p>
        <p className='text-xl font-semibold text-center'>Cantidad</p>
        <p className='text-xl font-semibold text-center'>Precio</p>

        {orderedDishes?.map((item) => (
          <Fragment key={item._id}>
            <p className='text-center'>{item.dish.name}</p>
            <p className='text-center'>{item.quantity}</p>
            <p className='text-center'>
              {handleFormatPrice(item.dish, currency)}
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
