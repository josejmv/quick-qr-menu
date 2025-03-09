// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

// types
import type { OrderedDishDataType } from '@/_types/models/ordered-dish'
import type { OrderDataType } from '@/_types/models/order'
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type AmountCellProps = {
  currency: string
  order: OrderDataType
}

export const AmountCell: FC<AmountCellProps> = ({ order, currency }) => {
  const [totalAmount, setTotalAmount] = useState<number>()

  useEffect(() => {
    ;(async () => {
      const orderedDishesResponse = await axiosInstance.post(
        '/api/ordered-dish/get-many',
        { orderedDishIds: order.orderedDishes }
      )
      const dishesResponse = await axiosInstance.post('/api/dish/get-many', {
        dishIds: orderedDishesResponse.data.map(
          (orderedDish: OrderedDishDataType) => orderedDish.dish
        ),
      })
      const formattedDishes = orderedDishesResponse.data.map(
        (orderedDish: OrderedDishDataType) => ({
          ...orderedDish,
          dish: dishesResponse.data.find(
            (dish: DishDataType) =>
              dish._id === (orderedDish.dish as unknown as string)
          ),
        })
      )

      const total = formattedDishes.reduce(
        (value: number, nextIdx: typeof formattedDishes) => {
          const dishPrice = nextIdx.dish.price.find(
            (price: DishDataType['price'][number]) =>
              price.currency === currency
          )
          value +=
            ((dishPrice?.discountPrice || dishPrice?.basePrice) ?? 0) *
            nextIdx.quantity

          return value
        },
        0
      )
      setTotalAmount(total)
    })()
  }, [order, currency])

  return (
    <td
      className={twMerge(
        'border border-gray-300 p-2',
        totalAmount === undefined && 'skeleton'
      )}
    >
      {totalAmount !== undefined
        ? `${totalAmount || 'Sin monto en'} ${currency}`
        : ''}
    </td>
  )
}
