'use client'

// main tools
import { axiosInstance } from '~/app/_lib/axios-instance'
import { useForm } from 'react-hook-form'

// components
import { Checkbox, InputText, TextArea } from '@/_components/atoms/inputs'
import { DialogTitle, Description } from '@headlessui/react'
import { Button } from '@/_components/atoms/button'
import { Fragment } from 'react'

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
  description: string
  category: DishCategoryDataType
  price: { basePrice: number; discountPrice: number; currency: 'COP' | 'USD' }[]
}

export const CreateDish: FC<CreateDishProps> = ({ onClose, business }) => {
  const {
    watch,
    register,
    setError,
    setValue,
    getValues,
    formState,
    handleSubmit,
  } = useForm<Inputs>({ defaultValues: { visible: true, price: [] } })

  /**
   * @description watch for changes in the visible and price fields
   */
  watch(['visible', 'price'])

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
        {getValues('price').map((price, index) => (
          <Fragment key={index}>
            <div className='flex items-start gap-3'>
              <InputText
                type='number'
                isError={!!formState.errors.price?.[index]?.basePrice}
                onChange={(e) =>
                  setValue(`price.${index}.basePrice`, parseInt(e.target.value))
                }
                inputWrapperProps={{
                  label: 'Precio base',
                  hintText: formState.errors.price?.[index]?.basePrice?.message,
                }}
              />
              <InputText
                key={index}
                type='number'
                isError={!!formState.errors.price?.[index]?.discountPrice}
                onChange={(e) =>
                  setValue(
                    `price.${index}.discountPrice`,
                    parseInt(e.target.value)
                  )
                }
                inputWrapperProps={{
                  label: 'Precio con descuento',
                  hintText:
                    formState.errors.price?.[index]?.discountPrice?.message,
                }}
              />
            </div>
            <div className='flex gap-4'>
              <div className='flex gap-2 items-center'>
                <Checkbox
                  checked={price.currency === 'COP'}
                  disabled={getValues('price').some(
                    (price) => price.currency === 'COP'
                  )}
                  onChange={(e) =>
                    setValue(
                      `price.${index}.currency`,
                      e.target.checked ? 'COP' : 'USD'
                    )
                  }
                />
                <label>COP</label>
              </div>
              <div className='flex gap-2 items-center'>
                <Checkbox
                  checked={price.currency === 'USD'}
                  disabled={getValues('price').some(
                    (price) => price.currency === 'USD'
                  )}
                  onChange={(e) =>
                    setValue(
                      `price.${index}.currency`,
                      e.target.checked ? 'USD' : 'COP'
                    )
                  }
                />
                <label>USD</label>
              </div>
            </div>
          </Fragment>
        ))}
        {getValues('price').length < 2 && (
          <Button
            type='button'
            onClick={() =>
              setValue('price', [
                ...getValues('price'),
                {
                  basePrice: 0,
                  discountPrice: 0,
                  currency: getValues('price').some(
                    (price) => price.currency === 'COP'
                  )
                    ? 'USD'
                    : 'COP',
                },
              ])
            }
          >
            Añadir precio
          </Button>
        )}

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
