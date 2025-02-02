// main tools
import { axiosInstance } from '@/_lib/axios-instance'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

// components
import Image from 'next/image'

// utils
import { authOptions } from '@/(root)/(paths)/api/auth/[...nextauth]'

// types
import type { NextPage } from 'next'

const LoginPage: NextPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    const businesses = await axiosInstance.post('/api/business/get-all', {
      ownerId: session.user._id,
    })

    if (!businesses.data || businesses.data.length === 0)
      redirect('/crear-negocio')
    else redirect('/mis-negocios')
  }

  const SignUpForm = dynamic(
    () => import('./_components/form').then((module) => module.SignUpForm),
    { loading: () => null }
  )

  return (
    <main className='h-screen flex justify-center items-center'>
      <Image
        fill
        priority
        sizes='100vw'
        alt='background-picture'
        src='/images/login-page/picture.jpg'
        className='object-cover object-center brightness-125'
      />
      <div className='max-w-xl relative'>
        <SignUpForm />
      </div>
    </main>
  )
}

export default LoginPage
