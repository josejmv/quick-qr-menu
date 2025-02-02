'use client'

// main tools
import { useState } from 'react'

// components
import { CreateUser } from '@/_components/molecules/create-user'
import { Dialog } from '@/_components/atoms/dialog'
import { Button } from '@/_components/atoms/button'

// types
import { BusinessDataType } from '@/_types/models/business'
import type { UserDataType } from '@/_types/models/user'
import type { FC } from 'react'

type UsersTableProps = {
  employees: UserDataType[]
  business: BusinessDataType
}

export const UsersTable: FC<UsersTableProps> = ({ employees, business }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id} className='border-b border-gray-300'>
                <td className='border border-gray-300 p-2'>{employee.name}</td>
                <td className='border border-gray-300 p-2'>{employee.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className='border border-gray-300 py-8 text-center'
              >
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className='border border-gray-300 p-2'>
              <div className='flex justify-end'>
                <Button onClick={() => setShowModal(true)}>
                  Agregar empleado
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
        <CreateUser business={business} onClose={() => setShowModal(false)} />
      </Dialog>
    </>
  )
}
