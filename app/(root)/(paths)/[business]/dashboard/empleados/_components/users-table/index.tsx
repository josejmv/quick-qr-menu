// types
import type { UserDataType } from '@/_types/models/user'
import type { FC } from 'react'

type UsersTableProps = {
  data: UserDataType[]
}

export const UsersTable: FC<UsersTableProps> = ({ data }) => (
  <table className='w-full border-collapse table-fixed'>
    <thead>
      <tr>
        <th className='border border-gray-300 p-2'>Name</th>
        <th className='border border-gray-300 p-2'>Email</th>
        <th className='border border-gray-300 p-2'>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((user) => (
          <tr key={user._id} className='border-b border-gray-300'>
            <td className='border border-gray-300 p-2'>{user.name}</td>
            <td className='border border-gray-300 p-2'>{user.email}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={2} className='border border-gray-300 py-8 text-center'>
            No hay usuarios registrados
          </td>
        </tr>
      )}
    </tbody>
  </table>
)
