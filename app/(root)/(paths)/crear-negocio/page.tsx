// components
import { CreateBusinessForm } from './_components/form'
import Image from 'next/image'

// types
import type { NextPage } from 'next'

const CreateBusinessPage: NextPage = async () => (
  <main className='h-screen flex justify-center pt-20'>
    <Image
      fill
      priority
      sizes='100vw'
      alt='background-picture'
      src='/images/login-page/picture.jpg'
      className='object-cover object-center brightness-125'
    />
    <div className='max-w-screen-sm w-full relative'>
      <CreateBusinessForm />
    </div>
  </main>
)

export default CreateBusinessPage
