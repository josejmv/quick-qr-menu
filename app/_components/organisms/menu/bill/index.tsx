'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useCallback, useEffect, useState } from 'react'

// components
import { InputSelect } from '@/_components/atoms/inputs'
import { Divider } from '@/_components/atoms/divider'
import { Fragment } from 'react'

// types
import type { OrderedDishDataType } from '@/_types/models/ordered-dish'
import type { SelectOptionType } from '@/_components/atoms/inputs'
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
  const [currency, setCurrency] = useState<SelectOptionType>()

  const handleFormatPrice = useCallback(
    (dish: DishDataType, currency: string) =>
      `${
        dish.price.find((price) => price.currency === currency)?.basePrice ??
        'Sin precio en'
      } ${currency}`,
    []
  )

  const handleFormatTotal = useCallback(() => {
    const total = orderedDishes?.reduce(
      (acc, item) =>
        acc +
        item.quantity *
          parseFloat(
            `${
              item.dish.price.find(
                (price) => price.currency === (currency?.value ?? 'COP')
              )?.basePrice ?? 0
            }`
          ),
      0
    )
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency?.value ?? 'COP',
    }).format(total ?? 0)
  }, [orderedDishes, currency])

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
        <InputSelect
          value={currency}
          inputWrapperProps={{ containerClassName: 'w-1/4' }}
          onChange={(ev) => setCurrency(ev.target.value as SelectOptionType)}
          options={[
            { label: 'COP', value: 'COP' },
            { label: 'USD', value: 'USD' },
          ]}
        />
      </div>
      <p>
        Estatus:{' '}
        {orderState.status === 'processing' ? 'En proceso' : 'Completado'}
      </p>
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
              {handleFormatPrice(item.dish, currency?.value ?? 'COP')}
            </p>
          </Fragment>
        ))}
      </div>
      <Divider className='my-4' />
      <div className='flex justify-between'>
        <p className='text-xl font-semibold'>Total</p>
        <p className='text-xl font-semibold'>{handleFormatTotal()}</p>
      </div>
    </div>
  )
}
