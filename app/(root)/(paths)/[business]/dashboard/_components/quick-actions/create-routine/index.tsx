'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '~/app/_components/atoms/button'

// types
import type { FC } from 'react'

type CreateRoutineProps = {
  onClose: () => void
}

export const CreateRoutine: FC<CreateRoutineProps> = ({ onClose }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear rutina
      </DialogTitle>
      <Description className='text-center text-sm'>
        Crear una receta te permitirá gestionar su rutina de ejercicios y
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
