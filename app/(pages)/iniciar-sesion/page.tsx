// main tools
import Image from 'next/image'

// components
import { LoginForm } from './components/form'

// types
import type { NextPage } from 'next'

const LoginPage: NextPage = async () => (
  <main className='h-screen w-full flex justify-center'>
    <div className='relative h-full w-full max-w-screen-lg flex items-center justify-center py-10 px-10 xl:px-0 flex-col-reverse lg:flex-row gap-16'>
      <Image
        fill
        alt='hero-picture'
        src='/login-page/picture.jpg'
        className='object-cover object-center block sm:hidden'
      />
      <LoginForm />
      <div className='relative w-full lg:w-1/2 max-h-[340px] lg:max-h-[680px] h-full hidden sm:block'>
        <Image
          fill
          alt='hero-picture'
          src='/login-page/picture.jpg'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          className='object-cover object-center rounded-se-3xl rounded-es-3xl'
        />
      </div>
    </div>
  </main>
)

export default LoginPage
