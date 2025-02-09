'use client'

// components
import { Button } from '@/_components/atoms/button'
import { Alert } from '@/_components/atoms/alert'

// types
import type { FC } from 'react'

type ConfirmDeleteDishProps = {
  id: string
  onClose: () => void
}

export const ConfirmDeleteDish: FC<ConfirmDeleteDishProps> = ({ onClose }) => {
  return (
    <div>
      <Alert
        variant='ERROR'
        className='bg-transparent border-0'
        descriptionClassName='break-normal mt-3'
        title='¿Estás seguro de que deseas eliminar este usuario?'
        description='Esta acción no puede ser revertida así que acepta solo si estás completamente seguro'
      />
      <div className='flex justify-end gap-4 mt-4'>
        <Button variant='GHOST' color='TERTIARY' onClick={onClose}>
          Cancelar
        </Button>
        <Button color='ERROR'>Eliminar</Button>
      </div>
    </div>
  )
}
