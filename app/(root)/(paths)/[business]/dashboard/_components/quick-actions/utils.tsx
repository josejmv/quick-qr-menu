// main tools
import dynamic from 'next/dynamic'

// icons
import {
  UserPlusIcon,
  SquaresPlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid'

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
    type: 'TABLE',
    label: 'Añadir mesa',
    Icon: SquaresPlusIcon,
    actionLabel: 'Agregar mesa',
    description:
      'Agrega una nueva mesa a tu negocio de forma rápida y sencilla',
  },
  {
    type: 'DISH',
    label: 'Platos',
    Icon: BookOpenIcon,
    actionLabel: 'Agregar plato',
    description: 'Agrega un nuevo plato a tu menú de forma rápida y sencilla',
  },
]

const importCreateUserComponent = dynamic(
  () =>
    import('@/_components/molecules/create-user').then((mod) => mod.CreateUser),
  { loading: () => <p>CARGANDO</p> }
)
const importCreateDishComponent = dynamic(
  () =>
    import('@/_components/molecules/create-dish').then((mod) => mod.CreateDish),
  { loading: () => <p>CARGANDO</p> }
)
const importCreateTableComponent = dynamic(
  () =>
    import('@/_components/molecules/create-table').then(
      (mod) => mod.CreateTable
    ),
  { loading: () => <p>CARGANDO</p> }
)

export const createCases = {
  USER: importCreateUserComponent,
  DISH: importCreateDishComponent,
  TABLE: importCreateTableComponent,
}
