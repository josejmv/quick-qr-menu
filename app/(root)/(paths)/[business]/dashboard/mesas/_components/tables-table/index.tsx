'use client'

// main tools
import { useMemo, useState } from 'react'

// components
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Dialog } from '@/_components/atoms/dialog'
import { Button } from '@/_components/atoms/button'

// utils
import { tableCrudCases } from './utils'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { TableDataType } from '@/_types/models/table'
import type { FC } from 'react'

type TablesTableProps = {
  tables: TableDataType[]
  business: BusinessDataType
}

export const TablesTable: FC<TablesTableProps> = ({ tables, business }) => {
  const [showModal, setShowModal] = useState('')

  const CrudComponent = useMemo(() => {
    const [useCase] = showModal.split('-')

    return (
      tableCrudCases[useCase as keyof typeof tableCrudCases] ?? (() => null)
    )
  }, [showModal])

  const tableId = useMemo(() => {
    const [_, id] = showModal.split('-')
    return id
  }, [showModal])

  return (
    <>
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Nombre</th>
            <th className='border border-gray-300 p-2'>Ordenes tomadas</th>
            <th className='border border-gray-300 p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tables.length > 0 ? (
            tables.map((table) => (
              <tr
                key={table._id}
                className='border-b border-gray-300 text-center'
              >
                <td className='border border-gray-300 p-2'>{table.name}</td>
                <td className='border border-gray-300 p-2'>
                  {table.orders.length}
                </td>
                <td className='border border-gray-300 p-2'>
                  <div className='flex justify-center gap-4'>
                    <PencilIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`UPDATE-${table._id}`)}
                    />
                    <TrashIcon
                      className='w-5 h-5 cursor-pointer'
                      onClick={() => setShowModal(`DELETE-${table._id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className='border border-gray-300 py-8 text-center'
              >
                No hay mesas registrados
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className='border border-gray-300 p-2'>
              <div className='flex justify-end'>
                <Button onClick={() => setShowModal('CREATE')}>
                  Agregar mesa
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
          id={tableId}
          business={business}
          onClose={() => setShowModal('')}
        />
      </Dialog>
    </>
  )
}
