'use client'

// main tools
import { useForm } from 'react-hook-form'

// components
import { LoginFormContent } from './fields'

// types
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

export type Inputs = { username: string; password: string }

export const LoginForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>()

  const submitControl: SubmitHandler<Inputs> = (data) => {
    console.log('SUBMIT', data)
  }

  return (
    <LoginFormContent
      data={formState}
      register={register}
      onSubmit={handleSubmit(submitControl)}
    />
  )
}
