'use client'

// main tools
import { useSession, signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

// components
import { LoginFormContent } from './fields'

// types
import type { SubmitHandler } from 'react-hook-form'
import type { FC } from 'react'

export type Inputs = { username: string; password: string }

export const LoginForm: FC = () => {
  const { data: session } = useSession()
  const { register, handleSubmit, formState, setError } = useForm<Inputs>()

  const submitControl: SubmitHandler<Inputs> = async (data) => {
    const response = await signIn('login', { ...data, redirect: false })

    if (!response?.ok) {
      setError('username', { message: response?.error ?? 'Error' })
      setError('password', { message: response?.error ?? 'Error' })
    }

    console.log({ response, data, session })
  }

  return (
    <LoginFormContent
      data={formState}
      register={register}
      onSubmit={handleSubmit(submitControl)}
    />
  )
}
