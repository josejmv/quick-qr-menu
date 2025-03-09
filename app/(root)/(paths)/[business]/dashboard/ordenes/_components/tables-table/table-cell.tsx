// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

// types
import type { OrderDataType } from '@/_types/models/order'
import type { TableDataType } from '@/_types/models/table'
import type { FC } from 'react'

type TableCellProps = {
  order: OrderDataType
}

export const TableCell: FC<TableCellProps> = ({ order }) => {
  const [table, setTable] = useState<TableDataType>()

  useEffect(() => {
    ;(async () => {
      const tableResponse = await axiosInstance.post('/api/table/get-by-id', {
        id: order.table,
      })

      setTable(tableResponse.data)
    })()
  }, [order])

  return (
    <td className={twMerge('border border-gray-300 p-2', !table && 'skeleton')}>
      {table?.name}
    </td>
  )
}
