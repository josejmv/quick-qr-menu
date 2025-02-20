// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useEffect, useState } from 'react'

// types
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type WatchDishDescriptionProps = {
  id: string
}

export const WatchDishDescription: FC<WatchDishDescriptionProps> = ({ id }) => {
  const [dish, setDish] = useState<DishDataType>()

  useEffect(() => {
    ;(async () => {
      const dishResponse = await axiosInstance.post('/api/dish/get', {
        id,
      })

      setDish(dishResponse.data)
    })()
  }, [id])

  return (
    <div>
      <h3 className='text-2xl font-bold'>{dish?.name}</h3>
      <div className='my-3'>
        <p>Descripción:</p>
        <p>{dish?.description}</p>
      </div>

      <div className='text-end'>
        <p className='text-lg font-semibold'>Precios</p>
        {dish?.price.map((price) => (
          <p key={price._id}>
            {price.basePrice} {price.currency}
          </p>
        ))}
      </div>
    </div>
  )
}
