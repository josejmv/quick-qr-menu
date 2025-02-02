'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

type CreateTableProps = {
  onClose: () => void
  business: BusinessDataType
}

export const CreateTable: FC<CreateTableProps> = ({ onClose }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear mesa
      </DialogTitle>
      <Description className='text-center text-sm'>
        Registra una nueva mesa para tu restaurante y comienza a atender
      </Description>

      {/* <div> ADD FORM HERE </div> */}

      <div className='flex justify-end gap-4 mt-4'>
        <Button onClick={onClose}>Guardar</Button>
        <Button variant='OUTLINE' color='TERTIARY' onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
