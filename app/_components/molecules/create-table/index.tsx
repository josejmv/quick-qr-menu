'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useForm } from 'react-hook-form'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { InputText } from '@/_components/atoms/inputs'
import { Button } from '@/_components/atoms/button'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { TableDataType } from '@/_types/models/table'
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type CreateUserProps = {
  onClose: () => void
  business: BusinessDataType
}

type Inputs = {
  name: string
  submit: string
}

export const CreateTable: FC<CreateUserProps> = ({ onClose, business }) => {
  const { register, setError, formState, handleSubmit } = useForm<Inputs>()

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const table = await axiosInstance.post<TableDataType & { error?: string }>(
      '/api/table/create',
      { name: data.name, business: business._id }
    )

    if (table.data._id) onClose()
    else {
      const [key, message] = table?.data.error?.split(':') ?? []

      setError((key as keyof Inputs) ?? 'submit', {
        message: message ?? 'Error inesperado',
      })
    }
  }

  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear mesa
      </DialogTitle>
      <Description className='text-center text-sm'>
        Agrega una nueva mesa a tu negocio para gestionar tus pedidos de forma
        más eficiente
      </Description>

      <form
        onSubmit={handleSubmit(submitControl)}
        className='flex flex-col gap-5 my-8'
      >
        <InputText
          isError={!!formState.errors.name}
          {...register('name', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Número de la mesa',
            hintText: formState.errors.name?.message,
          }}
        />

        <div className='flex justify-end gap-4'>
          <Button type='submit'>Guardar</Button>
          <Button variant='GHOST' color='TERTIARY' onClick={onClose}>
            Cancelar
          </Button>
        </div>
        {formState.errors.submit && (
          <div className='text-red-500 text-center mt-2'>
            {formState.errors.submit.message}
          </div>
        )}
      </form>
    </div>
  )
}
