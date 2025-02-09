'use client'

// main tools
import { useMemo, useState } from 'react'

// components
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Dialog } from '@/_components/atoms/dialog'
import { Button } from '@/_components/atoms/button'

// utils
import { dishCrudCases } from './utils'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { DishDataType } from '@/_types/models/dish'
import type { FC } from 'react'

type DishesTableProps = {
  dishes: DishDataType[]
  business: BusinessDataType
}

export const DishesTable: FC<DishesTableProps> = ({ dishes, business }) => {
  const [showModal, setShowModal] = useState('')

  const CrudComponent = useMemo(() => {
    const [useCase] = showModal.split('-')
    return dishCrudCases[useCase as keyof typeof dishCrudCases] ?? (() => null)
  }, [showModal])

  const dishId = useMemo(() => {
    const [_, id] = showModal.split('-')
    return id
  }, [showModal])

  return (
    <>
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Nombre</th>
            <th className='border border-gray-300 p-2'>Precio</th>
            <th className='border border-gray-300 p-2'>Visibilidad</th>
            <th className='border border-gray-300 p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <tr
                key={dish._id}
                className='border-b border-gray-300 text-center'
              >
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
                  {dish.visible ? 'Visible' : 'Oculto'}
                </td>
                <td className='border border-gray-300 p-2'>
                  <div className='flex justify-center gap-4'>
                    <PencilIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`EDIT-${dish}`)}
                    />
                    <TrashIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`DELETE-${dish._id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className='border border-gray-300 py-8 text-center'
              >
                No hay platos registrados
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className='border border-gray-300 p-2'>
              <div className='flex justify-end'>
                <Button onClick={() => setShowModal('CREATE')}>
                  Agregar plato
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <Dialog
        open={!!showModal}
        onClose={() => setShowModal('')}
        panelClassName='max-w-screen-sm'
        className={showModal === 'DELETE' ? '[&>div>div]:px-4' : ''}
      >
        <CrudComponent
          id={dishId}
          business={business}
          onClose={() => setShowModal('')}
        />
      </Dialog>
    </>
  )
}
