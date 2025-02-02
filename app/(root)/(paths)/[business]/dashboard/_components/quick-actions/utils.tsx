// main tools
import dynamic from 'next/dynamic'

// icons
import { UserPlusIcon, BookOpenIcon } from '@heroicons/react/24/solid'

// types
import type { CardProps } from '@/_components/molecules/card/types'

export const actions: CardProps[] = [
  {
    type: 'USER',
    Icon: UserPlusIcon,
    label: 'Añadir usuario',
    actionLabel: 'Registrar usuario',
    description:
      'Agrega un nuevo usuario de forma rápida con solo unos simples pasos',
  },
  {
    type: 'MENU',
    label: 'Menú',
    Icon: BookOpenIcon,
    actionLabel: 'Agregar plato',
    description: 'Agrega un nuevo plato a tu menú de forma rápida y sencilla',
  },
]

const importCreateUserComponent = dynamic(
  () => import('./create-user').then((mod) => mod.CreateUser),
  { loading: () => <p>CARGANDO</p> }
)
const importCreateRecipeComponent = dynamic(
  () => import('./create-recipe').then((mod) => mod.CreateRecipe),
  { loading: () => <p>CARGANDO</p> }
)

export const createCases = {
  USER: importCreateUserComponent,
  RECIPE: importCreateRecipeComponent,
}
