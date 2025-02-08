'use client'

// main tools
import { axiosInstance } from '~/app/_lib/axios-instance'
import { useForm } from 'react-hook-form'

// components
import { Checkbox, InputText, TextArea } from '@/_components/atoms/inputs'
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'

// types
import type { DishCategoryDataType } from '@/_types/models/dish-category'
import type { BusinessDataType } from '@/_types/models/business'
import type { DishDataType } from '@/_types/models/dish'
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type CreateDishProps = {
  onClose: () => void
  business: BusinessDataType
}

type Inputs = {
  name: string
  submit: string
  visible: boolean
  basePrice: number
  description: string
  currentPrice: number
  category: DishCategoryDataType
}

export const CreateDish: FC<CreateDishProps> = ({ onClose, business }) => {
  const { register, handleSubmit, getValues, watch, formState, setError } =
    useForm<Inputs>({ defaultValues: { visible: true } })
  watch('visible')

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const dish = await axiosInstance.post<DishDataType & { error?: string }>(
      '/api/dish/create',
      { ...data, menu: business.menu }
    )

    if (dish.data._id) onClose()
    else {
      const [key, message] = dish?.data.error?.split(':') ?? []

      setError((key as keyof Inputs) ?? 'submit', {
        message: message ?? 'Error inesperado',
      })
    }
  }

  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear receta
      </DialogTitle>
      <Description className='text-center text-sm'>
        Crea una nueva receta la cual será visible para tus clientes en el menú
        digital
      </Description>

      <form
        onSubmit={handleSubmit(submitControl)}
        className='flex flex-col gap-5 my-8'
      >
        <InputText
          isError={!!formState.errors.name}
          {...register('name', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Nombre',
            hintText: formState.errors.name?.message,
          }}
        />
        <div className='flex items-start gap-3'>
          <InputText
            type='number'
            isError={!!formState.errors.basePrice}
            {...register('basePrice', { required: 'Este campo es requerido' })}
            inputWrapperProps={{
              label: 'Precio base',
              hintText: formState.errors.basePrice?.message,
            }}
          />
          <InputText
            type='number'
            isError={!!formState.errors.currentPrice}
            {...register('currentPrice', {
              required: 'Este campo es requerido',
            })}
            inputWrapperProps={{
              label: 'Precio actual',
              hintText: formState.errors.currentPrice?.message,
              infoText:
                'Este precio indicará si hay algun descuento o promoción',
            }}
          />
        </div>

        <TextArea
          rows={3}
          maxLength={350}
          isError={!!formState.errors.description}
          {...register('description', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Descripción',
            hintText: formState.errors.description?.message,
          }}
        />

        <div className='flex gap-3 items-center'>
          <Checkbox checked={getValues('visible')} {...register('visible')} />
          <p className='text-base text-base-content font-medium'>
            {getValues('visible') ? 'Mostrar' : 'Ocultar'} plato en el menú
          </p>
        </div>

        <div className='flex justify-end gap-4'>
          <Button type='submit'>Guardar</Button>
          <Button variant='OUTLINE' color='TERTIARY' onClick={onClose}>
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
