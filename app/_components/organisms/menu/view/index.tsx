'use client'

// main tools
import { useEffect, useState } from 'react'

// components
import { MenuTable } from '@/_components/organisms/menu/table'
import { Bill } from '@/_components/organisms/menu/bill'

// hooks
import { useSubscription } from '@/_hooks/use-subscription'

// utils
import { SubscriptionActions } from '@/_commons/subscription-actions-enum'

// types
import type { OrderedDishDataType } from '@/_types/models/ordered-dish'
import type { OrderDataType } from '@/_types/models/order'
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type MenuViewProps = {
  dishes: DishDataType[]
  order: Omit<OrderDataType, 'dishes'> & { dishes: OrderedDishDataType[] }
}

export const MenuView: FC<MenuViewProps> = ({ order, dishes }) => {
  const { subscriptionClient } = useSubscription()
  const [orderState, setOrderState] = useState(order)

  useEffect(() => {
    subscriptionClient?.subscribe(`order-${order._id}`)
    return () => subscriptionClient?.unsubscribe(`order-${order._id}`)
  }, [subscriptionClient, order])

  useEffect(() => {
    subscriptionClient?.bind(
      SubscriptionActions.ADD,
      (response: { data: OrderedDishDataType }) => {
        const { data } = response
        setOrderState({ ...orderState, dishes: [...orderState.dishes, data] })
      }
    )

    subscriptionClient?.bind(
      SubscriptionActions.UPDATE_QUANTITY,
      (response: { data: OrderedDishDataType }) => {
        const { data } = response
        setOrderState((prev) => {
          const newDishes = prev.dishes.map((item) =>
            item._id === data._id ? data : item
          )
          return { ...prev, dishes: newDishes }
        })
      }
    )

    subscriptionClient?.bind(
      SubscriptionActions.REMOVE,
      (response: { data: OrderedDishDataType & { deleted: boolean } }) => {
        const { data } = response
        if (data.deleted) {
          setOrderState((prev) => {
            const newDishes = prev.dishes.filter(
              (item) => item._id !== data._id
            )
            return { ...prev, dishes: newDishes }
          })
        } else {
          setOrderState((prev) => {
            const newDishes = prev.dishes.map((item) =>
              item._id === data._id ? data : item
            )
            return { ...prev, dishes: newDishes }
          })
        }
      }
    )

    subscriptionClient?.bind(
      SubscriptionActions.SEND,
      (response: { data: OrderDataType }) => {
        const { data } = response
        setOrderState({ ...data })
      }
    )
  }, [subscriptionClient, orderState])

  return (
    <div className='bg-gray-500 bg-opacity-30 backdrop-blur-lg text-primary-content p-8 rounded-3xl'>
      {orderState.status === 'pending' ? (
        <MenuTable orderState={orderState} dishes={dishes} />
      ) : (
        <Bill orderState={orderState} />
      )}
    </div>
  )
}
