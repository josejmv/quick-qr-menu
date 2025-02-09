'use client'

// main tools
import { axiosInstance } from '~/app/_lib/axios-instance'

// components
import { Button } from '@/_components/atoms/button'
import { Alert } from '@/_components/atoms/alert'

// types
import type { BusinessDataType } from '~/app/_types/models/business'
import type { FC } from 'react'

type ConfirmDeleteTableProps = {
  id: string
  onClose: () => void
  business: BusinessDataType
}

export const ConfirmDeleteTable: FC<ConfirmDeleteTableProps> = ({
  id,
  onClose,
  business,
}) => {
  const handleDeleteTable = async () => {
    const response = await axiosInstance.post('/api/table/delete', {
      tableId: id,
      businessId: business._id,
    })

    if (response.data._id) onClose()
    else alert('Error al eliminar la mesa')
  }

  return (
    <div>
      <Alert
        variant='ERROR'
        className='bg-transparent border-0'
        descriptionClassName='break-normal mt-3'
        title='¿Estás seguro de que deseas eliminar esta mesa?'
        description='Esta acción no puede ser revertida así que acepta solo si estás completamente seguro'
      />
      <div className='flex justify-end gap-4 mt-4'>
        <Button color='ERROR' onClick={handleDeleteTable}>
          Eliminar
        </Button>
        <Button variant='GHOST' color='TERTIARY' onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
