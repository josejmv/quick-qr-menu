// main tools
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

// components
import Image from 'next/image'

// utils
import { authOptions } from '@/(root)/(paths)/api/auth/[...nextauth]/route'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { NextPage } from 'next'

const LoginPage: NextPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    const business: BusinessDataType = await import(
      `~/public/data/business/${session?.user.id}.json`
    ).then((data) => data.default)

    redirect(`/${business.slug}/dashboard`)
  }

  const LoginForm = dynamic(
    () => import('./_components/form').then((module) => module.LoginForm),
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
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
