'use client'

// main tools
import { useMemo, useState } from 'react'

// components
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { InputSelect } from '@/_components/atoms/inputs'
import { Dialog } from '@/_components/atoms/dialog'
import { AmountCell } from './amount-cell'
import { TableCell } from './table-cell'

// utils
import { orderCrudCases } from './utils'

// types
import type { SelectOptionType } from '@/_components/atoms/inputs'
import type { BusinessDataType } from '@/_types/models/business'
import type { OrderDataType } from '@/_types/models/order'
import type { FC } from 'react'

type OrdersTableProps = {
  orders: OrderDataType[]
  business: BusinessDataType
}

export const OrdersTable: FC<OrdersTableProps> = ({ orders, business }) => {
  const [showModal, setShowModal] = useState('')
  const [currency, setCurrency] = useState<SelectOptionType>({
    label: 'COP',
    value: 'COP',
  })

  const CrudComponent = useMemo(() => {
    const [useCase] = showModal.split('-')

    return (
      orderCrudCases[useCase as keyof typeof orderCrudCases] ?? (() => null)
    )
  }, [showModal])

  const orderId = useMemo(() => {
    const [_, id] = showModal.split('-')
    return id
  }, [showModal])

  return (
    <>
      <div className='flex justify-end text-end mb-3'>
        <InputSelect
          value={currency}
          onChange={(ev) => setCurrency(ev.target.value as SelectOptionType)}
          inputWrapperProps={{
            containerClassName: 'md:w-1/4 my-4 md:my-0',
            hintText: 'Muestra los precios en otras monedas',
          }}
          options={[
            { label: 'COP', value: 'COP' },
            { label: 'USD', value: 'USD' },
          ]}
        />
      </div>
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Estatus</th>
            <th className='border border-gray-300 p-2'>Mesa</th>
            <th className='border border-gray-300 p-2'>Monto</th>
            <th className='border border-gray-300 p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                className='border-b border-gray-300 text-center'
              >
                <td className='border border-gray-300 p-2'>{order.status}</td>
                <TableCell order={order} />
                <AmountCell currency={currency.value ?? 'COP'} order={order} />
                <td className='border border-gray-300 p-2'>
                  <div className='flex justify-center gap-4'>
                    <PencilIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`UPDATE-${order._id}`)}
                    />
                    <TrashIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`DELETE-${order._id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className='border border-gray-300 py-8 text-center'
              >
                No hay ordenes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog
        open={!!showModal}
        onClose={() => setShowModal('')}
        panelClassName='max-w-screen-sm'
        className={showModal === 'DELETE' ? '[&>div>div]:px-4' : ''}
      >
        <CrudComponent
          id={orderId}
          business={business}
          onClose={() => setShowModal('')}
        />
      </Dialog>
    </>
  )
}
