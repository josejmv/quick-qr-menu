'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

type CreateDishProps = {
  onClose: () => void
  business: BusinessDataType
}

export const CreateDish: FC<CreateDishProps> = ({ onClose }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear receta
      </DialogTitle>
      <Description className='text-center text-sm'>
        Crea una nueva receta la cual será visible para tus clientes en el menú
        digital
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
