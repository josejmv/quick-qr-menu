'use client'

// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import QrCode from 'qrcode'

// components
import { DialogTitle, Description } from '@headlessui/react'
import { InputText } from '@/_components/atoms/inputs'
import { Button } from '@/_components/atoms/button'
import Image from 'next/image'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { TableDataType } from '@/_types/models/table'
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

type UpdateTableProps = {
  id: string
  onClose: () => void
  business: BusinessDataType
}

type Inputs = {
  name: string
  qrCode: string
  submit: string
}

export const UpdateTable: FC<UpdateTableProps> = ({
  id,
  onClose,
  business,
}) => {
  const {
    watch,
    register,
    setError,
    setValue,
    formState,
    getValues,
    handleSubmit,
  } = useForm<Inputs>()

  watch('qrCode')

  const handleGenerateQrCode = () => {
    QrCode.toDataURL(
      `https://quick-qr-menu.vercel.app/${
        business.slug
      }?tableId=${id}&timestamp=${Date.now()}`
    ).then((res) => setValue('qrCode', res))
  }

  /**
   * @description function to handle the submit of the form
   */
  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const table = await axiosInstance.post<TableDataType & { error?: string }>(
      '/api/table/update',
      { _id: id, data: { name: data.name } }
    )

    if (table.data._id) onClose()
    else {
      const [key, message] = table?.data.error?.split(':') ?? []

      setError((key as keyof Inputs) ?? 'submit', {
        message: message ?? 'Error inesperado',
      })
    }
  }

  useEffect(() => {
    axiosInstance.post(`/api/table/get-by-id`, { id }).then((res) => {
      if (res.data._id) setValue('name', res.data.name)
      else setValue('submit', 'Mesa no encontrada')
    })

    return () => undefined
  }, [id, setValue])

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

        {getValues('qrCode') && (
          <Image
            width={150}
            height={150}
            alt='qr-code'
            className='mx-auto'
            src={getValues('qrCode')}
          />
        )}
        <Button type='button' onClick={handleGenerateQrCode}>
          Generar código QR
        </Button>

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
