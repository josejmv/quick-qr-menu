'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { FC } from 'react'

type CreateUserProps = {
  onClose: () => void
}

export const CreateUser: FC<CreateUserProps> = ({ onClose }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear usuario
      </DialogTitle>
      <Description className='text-center text-sm'>
        Crear un usuario te permitirá gestionar su rutina de ejercicios y
        entrenamiento.
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
