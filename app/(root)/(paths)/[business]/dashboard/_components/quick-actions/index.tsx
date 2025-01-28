'use client'

// main tools
import { useMemo, useState } from 'react'

// components
import { Dialog } from '@/_components/atoms/dialog'
import { Card } from '../../../../../../_components/molecules/card'

// utils
import { actions, createCases } from './utils'

// types
import type { BusinessDataType } from '@/_types/models/business'
import type { FC } from 'react'

interface QuickActionsProps {
  business: BusinessDataType
}

export const QuickActions: FC<QuickActionsProps> = ({ business }) => {
  const [showModal, setShowModal] = useState('')

  const CreateComponent = useMemo(
    () => createCases[showModal as keyof typeof createCases] ?? (() => null),
    [showModal]
  )

  const handleCloseModal = () => setShowModal('')

  return (
    <>
      <section className='bg-white p-4 rounded-2xl drop-shadow-md'>
        <h2 className='text-2xl font-bold'>Acciones rápidas</h2>
        <br />
        <article className='grid grid-cols-4 gap-2'>
          {actions.map((action) => (
            <Card
              {...action}
              key={action.label}
              onClick={() => setShowModal(action.type as string)}
            />
          ))}
        </article>
      </section>

      <Dialog
        panelClassName='max-w-screen-sm'
        open={showModal !== ''}
        onClose={handleCloseModal}
      >
        <CreateComponent business={business} onClose={handleCloseModal} />
      </Dialog>
    </>
  )
}
