'use client'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

type CreateUserProps = {
  onClose: () => void
  business: BusinessDataType
}

export const CreateUser: FC<CreateUserProps> = ({ onClose, business }) => {
  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear usuario
      </DialogTitle>
      <Description className='text-center text-sm'>
        Agrega un nuevo usuario de forma rápida con solo unos simples pasos para
        que te ayude en tu negocio
        <br />
        El usuario formará parte del equipo de &quot;
        <span className='font-bold text-primary'>{business.name}</span>
        &quot;
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
