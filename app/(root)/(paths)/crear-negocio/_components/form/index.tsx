'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'

// components
import { TextArea } from '@/_components/atoms/inputs/templates/text-area'
import { InputText } from '@/_components/atoms/inputs'
import { Button } from '@/_components/atoms/button'
import Link from 'next/link'

// types
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type Inputs = {
  name: string
  slug: string
  submit: string
  description: string
}

export const CreateBusinessForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>()

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const session = await getSession()
    const response = await axiosInstance.post('/api/business/create', {
      ...data,
      owner: session?.user._id,
      slug: data.name.toLowerCase().replace(/\s/g, '-'),
    })

    if (response.data._id) redirect(`/${response.data.slug}/dashboard`)
    else console.log(response)
  }

  return (
    <form
      onSubmit={handleSubmit(submitControl)}
      className='bg-gray-500 bg-opacity-30 backdrop-blur-lg text-primary-content p-8 rounded-3xl'
    >
      <div className='text-center pt-3 font-[family-name:var(--font-geist-mono)]'>
        <h1 className='text-xl md:text-2xl xl:text-3xl font-semibold'>
          Crea tu negocio
        </h1>
      </div>

      <div className='flex flex-col gap-5 my-8'>
        <InputText
          isError={!!formState.errors.name}
          {...register('name', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Nombre del negocio',
            hintText: formState.errors.name?.message,
            labelClassName: 'text-primary-content-shade-darken-12',
          }}
        />
        <TextArea
          rows={3}
          isError={!!formState.errors.description}
          {...register('description', { required: 'Este campo es requerido' })}
          inputWrapperProps={{
            label: 'Descripción del negocio',
            hintText: formState.errors.description?.message,
            labelClassName: 'text-primary-content-shade-darken-12',
            infoTextClassName: 'text-primary-content-shade-darken-12',
          }}
        />
      </div>

      <Button
        type='submit'
        className='w-full font-bold mb-3'
        isError={!!formState.errors.name || !!formState.errors.description}
      >
        Crear negocio
      </Button>
      <Link href='/mis-negocios'>
        <Button variant='GHOST' className='w-full font-bold'>
          Ir a mis negocios
        </Button>
      </Link>
      {formState.errors.submit && (
        <div className='text-red-500 text-center mt-2'>
          {formState.errors.submit.message}
        </div>
      )}
    </form>
  )
}
