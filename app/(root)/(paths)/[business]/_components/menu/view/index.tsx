'use client'

// main tools
import { useEffect, useState } from 'react'

// components
import { MenuTable } from '../table'
import { Bill } from '../bill'

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
  order: Omit<OrderDataType, 'orderedDishes'> & {
    orderedDishes: OrderedDishDataType[]
  }
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
        setOrderState({
          ...orderState,
          orderedDishes: [...orderState.orderedDishes, data],
        })
      }
    )

    subscriptionClient?.bind(
      SubscriptionActions.UPDATE_QUANTITY,
      (response: { data: OrderedDishDataType }) => {
        const { data } = response
        setOrderState((prev) => {
          const newDishes = prev.orderedDishes.map((item) =>
            item._id === data._id ? data : item
          )
          return { ...prev, orderedDishes: newDishes }
        })
      }
    )

    subscriptionClient?.bind(
      SubscriptionActions.REMOVE,
      (response: { data: OrderedDishDataType & { deleted: boolean } }) => {
        const { data } = response
        if (data.deleted) {
          setOrderState((prev) => {
            const newDishes = prev.orderedDishes.filter(
              (item) => item._id !== data._id
            )
            return { ...prev, orderedDishes: newDishes }
          })
        } else {
          setOrderState((prev) => {
            const newDishes = prev.orderedDishes.map((item) =>
              item._id === data._id ? data : item
            )
            return { ...prev, orderedDishes: newDishes }
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
