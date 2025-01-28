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
import type { UserDataType } from '@/_types/models/user'
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type CreateUserProps = {
  onClose: () => void
  business: BusinessDataType
}

type Inputs = {
  submit: string
  username: string
  password: string
  confirmPassword: string
}

export const CreateUser: FC<CreateUserProps> = ({ onClose, business }) => {
  const { register, handleSubmit, formState, getValues, setError } =
    useForm<Inputs>()

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const user = await axiosInstance.post<UserDataType & { error: string }>(
      '/api/user/create',
      {
        role: 'employee',
        business: business._id,
        username: data.username,
        password: data.password,
      }
    )

    if (user.data._id) {
      const response = await axiosInstance.post<BusinessDataType>(
        '/api/business/assign-user',
        { businessId: business._id, userId: user.data._id }
      )

      if (response.data._id) onClose()
      else {
        setError('submit', {
          message: 'Error al asignar el usuario al negocio',
        })
        console.log(response)
      }
    } else {
      const [key, message] = user?.data.error?.split(':') ?? []

      setError((key as keyof Inputs) ?? 'submit', {
        message: message ?? 'Error inesperado',
      })
    }
  }

  return (
    <div>
      <DialogTitle className='text-xl text-center font-bold'>
        Crear usuario
      </DialogTitle>
      <Description className='text-center text-sm'>
        Agrega un nuevo usuario de forma rápida para que te ayude en tu negocio
        <br />
        El usuario formará parte del equipo de &quot;
        <span className='font-bold text-primary'>{business.name}</span>
        &quot;
      </Description>

      <form
        onSubmit={handleSubmit(submitControl)}
        className='flex flex-col gap-5 my-8'
      >
        <InputText
          isError={!!formState.errors.username}
          {...register('username', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Nombre de usuario',
            hintText: formState.errors.username?.message,
          }}
        />
        <InputText
          type='password'
          isError={!!formState.errors.password}
          {...register('password', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Contraseña',
            hintText: formState.errors.password?.message,
          }}
        />
        <InputText
          type='password'
          isError={!!formState.errors.confirmPassword}
          {...register('confirmPassword', {
            required: 'Este campo es requerido',
            validate: (value) =>
              value === getValues().password || 'Las contraseñas no coinciden',
          })}
          inputWrapperProps={{
            label: 'Confirmar contraseña',
            hintText: formState.errors.confirmPassword?.message,
          }}
        />

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
