'use client'

// main tools
import { useState } from 'react'

// components
import { CreateDish } from '@/_components/molecules/create-dish'
import { Dialog } from '@/_components/atoms/dialog'
import { Button } from '@/_components/atoms/button'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type DishesTableProps = {
  dishes: DishDataType[]
  business: BusinessDataType
}

export const DishesTable: FC<DishesTableProps> = ({ dishes, business }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Nombre</th>
            <th className='border border-gray-300 p-2'>Precio actual</th>
            <th className='border border-gray-300 p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <tr key={dish._id} className='border-b border-gray-300'>
                <td className='border border-gray-300 p-2'>{dish.name}</td>
                <td className='border border-gray-300 p-2'>
                  {dish.currentPrice}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className='border border-gray-300 py-8 text-center'
              >
                No hay platos registrados
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className='border border-gray-300 p-2'>
              <div className='flex justify-end'>
                <Button onClick={() => setShowModal(true)}>
                  Agregar plato
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <Dialog
        open={showModal}
        panelClassName='max-w-screen-sm'
        onClose={() => setShowModal(false)}
      >
        <CreateDish business={business} onClose={() => setShowModal(false)} />
      </Dialog>
    </>
  )
}
