// main tools
import dynamic from 'next/dynamic'

// icons
import {
  UserPlusIcon,
  BookOpenIcon,
  UserGroupIcon,
  SquaresPlusIcon,
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
    type: 'GROUP',
    label: 'Grupos',
    Icon: UserGroupIcon,
    actionLabel: 'Crear grupo',
    description:
      'Crea un nuevo grupo de usuarios para organizarlos por cada sede o área',
  },
  {
    type: 'TABLES',
    label: 'Mesas',
    Icon: SquaresPlusIcon,
    actionLabel: 'Registrar mesa',
    description:
      'Agrega una nueva mesa para tu restaurante y comienza a atender',
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
const importCreateGroupComponent = dynamic(
  () => import('./create-group').then((mod) => mod.CreateGroup),
  { loading: () => <p>CARGANDO</p> }
)
const importCreateRecipeComponent = dynamic(
  () => import('./create-recipe').then((mod) => mod.CreateRecipe),
  { loading: () => <p>CARGANDO</p> }
)
const importCreateRoutineComponent = dynamic(
  () => import('./create-routine').then((mod) => mod.CreateRoutine),
  { loading: () => <p>CARGANDO</p> }
)

export const createCases = {
  USER: importCreateUserComponent,
  GROUP: importCreateGroupComponent,
  RECIPE: importCreateRecipeComponent,
  ROUTINE: importCreateRoutineComponent,
}
