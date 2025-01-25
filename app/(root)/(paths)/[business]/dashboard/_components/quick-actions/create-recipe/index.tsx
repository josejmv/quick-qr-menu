'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { FC } from 'react'

type CreateRecipeProps = {
  onClose: () => void
}

export const CreateRecipe: FC<CreateRecipeProps> = ({ onClose }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear receta
      </DialogTitle>
      <Description className='text-center text-sm'>
        Crear un grupo te permitirá gestionar su rutina de ejercicios y
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
