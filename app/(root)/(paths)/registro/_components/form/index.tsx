'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { signIn, getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// components
import { InputText } from '@/_components/atoms/inputs'
import { Button } from '@/_components/atoms/button'
import Link from 'next/link'

// types
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type Inputs = {
  submit: string
  username: string
  password: string
  confirmPassword: string
}

export const SignUpForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState, getValues, setError } =
    useForm<Inputs>()

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const response = await signIn('signup', { ...data, redirect: false })

    if (!response?.ok) {
      const [key, message] = response?.error?.split(':') ?? []

      setError((key as keyof Inputs) ?? 'submit', {
        message: message ?? 'Error inesperado',
      })
    } else {
      const session = await getSession()
      const businesses = await axiosInstance.post('/api/business/get-all', {
        ownerId: session?.user._id,
      })

      if (!businesses.data || businesses.data.length === 0)
        redirect('/crear-negocio')
      else redirect(`/${businesses.data[0].slug}/dashboard`)
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(submitControl)}
      className='bg-gray-500 bg-opacity-30 backdrop-blur-lg text-primary-content p-8 rounded-3xl'
    >
      <div className='text-center pt-3 font-[family-name:var(--font-geist-mono)]'>
        <h2 className='text-lg md:text-xl xl:text-2xl'>
          Crea tu cuenta y vive la
        </h2>
        <h1 className='text-xl md:text-2xl xl:text-3xl font-semibold'>
          experiencia <span className='text-primary'>QuickMenü</span>
        </h1>
      </div>

      <div className='flex flex-col gap-5 my-8'>
        <InputText
          isError={!!formState.errors.username}
          {...register('username', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Nombre de usuario',
            hintText: formState.errors.username?.message,
            labelClassName: 'text-primary-content-shade-darken-12',
          }}
        />
        <InputText
          type='password'
          isError={!!formState.errors.password}
          {...register('password', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Contraseña',
            hintText: formState.errors.password?.message,
            labelClassName: 'text-primary-content-shade-darken-12',
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
            labelClassName: 'text-primary-content-shade-darken-12',
          }}
        />
      </div>

      <div className='text-center my-5 flex flex-col gap-2'>
        <span>
          ¿Ya tienes una cuenta?{' '}
          <Link className='text-primary' href='/iniciar-sesion'>
            Inicia sesión
          </Link>
        </span>
      </div>

      <Button
        type='submit'
        loading={loading}
        className='w-full font-bold'
        isError={!!formState.errors.username || !!formState.errors.password}
      >
        Crear cuenta
      </Button>
      {formState.errors.submit && (
        <div className='text-red-500 text-center mt-2'>
          {formState.errors.submit.message}
        </div>
      )}
    </form>
  )
}
