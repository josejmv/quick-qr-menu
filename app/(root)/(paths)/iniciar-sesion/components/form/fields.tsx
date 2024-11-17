// components
import { InputText } from '@/(components)/atoms/inputs'
import { Button } from '@/(components)/atoms/button'

// types
import type { FormState, UseFormRegister } from 'react-hook-form'
import type { Inputs } from '.'
import type { FC } from 'react'

type LoginFormContentProps = {
  onSubmit: () => void
  data: FormState<Inputs>
  register: UseFormRegister<Inputs>
}

export const LoginFormContent: FC<LoginFormContentProps> = ({
  data,
  onSubmit,
  register,
}) => (
  <form
    onSubmit={onSubmit}
    className='relative w-full sm:w-2/3 lg:w-1/2 bg-gray-200 text-black p-8 rounded-3xl'
  >
    <div className='text-center'>
      <h2 className='pt-3 text-lg md:text-xl xl:text-2xl'>
        Inicia sesión y vive la
      </h2>
      <h1 className='text-xl md:text-2xl xl:text-3xl font-semibold'>
        experiencia QuickMenü
      </h1>
    </div>

    <div className='flex flex-col gap-5 my-8'>
      <InputText
        isError={!!data.errors.username}
        {...register('username', { required: 'Este campo es requerido' })}
        inputWrapperProps={{
          label: 'Nombre de usuario',
          hintText: data.errors.username?.message,
        }}
      />
      <InputText
        type='password'
        isError={!!data.errors.password}
        {...register('password', { required: 'Este campo es requerido' })}
        inputWrapperProps={{
          label: 'Contraseña',
          hintText: data.errors.password?.message,
        }}
      />
    </div>

    <Button
      type='submit'
      className='w-full font-bold'
      isError={!!data.errors.username || !!data.errors.password}
    >
      Iniciar sesión
    </Button>
  </form>
)
