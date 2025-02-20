'use client'

// main tools
import { axiosInstance } from '~/app/_lib/axios-instance'

// components
import {
  EyeIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/solid'
import { Button } from '@/_components/atoms/button'

// types
import type { DishDataType } from '@/_types/models/dish'
import type { OrderDataType } from '@/_types/models/order'
import type { Schema } from 'mongoose'
import type { FC } from 'react'

type MenuTableProps = {
  orderState: OrderDataType
  dishes: DishDataType[]
}

export const MenuTable: FC<MenuTableProps> = ({ dishes, orderState }) => {
  const handleAddOtherDish = async (dish: DishDataType) => {
    const orderedDish = orderState.dishes.find(
      (dishToCompare) =>
        dishToCompare.dish === (dish._id as unknown as Schema.Types.ObjectId)
    )

    await axiosInstance.post('/api/subscription/add-other-dish', {
      orderId: orderState._id,
      orderedDishId: orderedDish!._id,
      quantity: orderedDish!.quantity + 1,
    })
  }

  const handleAddNewDish = async (dish: DishDataType) => {
    await axiosInstance.post('/api/subscription/add-new-dish', {
      quantity: 1,
      dishId: dish._id,
      orderId: orderState._id,
    })
  }

  const handleRemoveDish = async (dish: DishDataType) => {
    const orderedDish = orderState.dishes.find(
      (dishToCompare) =>
        dishToCompare.dish === (dish._id as unknown as Schema.Types.ObjectId)
    )

    await axiosInstance.post('/api/subscription/remove-dish', {
      orderId: orderState._id,
      orderedDishId: orderedDish!._id,
      quantity: orderedDish!.quantity - 1,
    })
  }

  const handleSendOrder = async () =>
    axiosInstance.post('/api/subscription/send-order', {
      orderId: orderState._id,
    })

  return (
    <table className='w-full border-collapse table-fixed'>
      <thead>
        <tr>
          <th className='border border-gray-300 p-2'>Nombre</th>
          <th className='border border-gray-300 p-2'>Precio</th>
          <th className='border border-gray-300 p-2'>Descripción</th>
          <th className='border border-gray-300 p-2'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <tr key={dish._id} className='border-b border-gray-300 text-center'>
              <td className='border border-gray-300 p-2'>{dish.name}</td>
              <td className='border border-gray-300 p-2'>
                <ul>
                  {dish.price.map((price) => (
                    <li key={`${dish._id}-${price.currency}`}>
                      {price.basePrice} {price.currency}
                    </li>
                  ))}
                </ul>
              </td>
              <td className='border border-gray-300 p-2'>
                <div className='flex justify-center'>
                  <EyeIcon
                    title='Ver descripción'
                    className='w-5 h-5 cursor-pointer'
                  />
                </div>
              </td>
              <td className='border border-gray-300 p-2'>
                <div className='flex justify-center gap-4'>
                  {orderState.dishes.some((item) => {
                    const id = dish._id as unknown as Schema.Types.ObjectId
                    return item.dish === id
                  }) ? (
                    <>
                      <div className='flex gap-1'>
                        <MinusCircleIcon
                          title='Remover del pedido'
                          className='w-5 h-5 cursor-pointer'
                          onClick={() => handleRemoveDish(dish)}
                        />
                        {
                          orderState.dishes.find((item) => {
                            const id =
                              dish._id as unknown as Schema.Types.ObjectId
                            return item.dish === id
                          })!.quantity
                        }
                        <PlusCircleIcon
                          title='Agregar al pedido'
                          className='w-5 h-5 cursor-pointer'
                          onClick={() => handleAddOtherDish(dish)}
                        />
                      </div>
                    </>
                  ) : (
                    <PlusCircleIcon
                      title='Agregar al pedido'
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => handleAddNewDish(dish)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className='border border-gray-300 py-8 text-center'>
              No hay platos registrados
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className='border border-gray-300 p-2'>
            <div className='flex justify-end'>
              <Button color='SECONDARY' onClick={handleSendOrder}>
                Procesar pedido
              </Button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
