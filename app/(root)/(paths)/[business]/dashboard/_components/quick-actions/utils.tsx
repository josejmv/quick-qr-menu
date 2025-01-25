// main tools
import dynamic from 'next/dynamic'

// icons
import {
  UserPlusIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid'

// types
import type { CardProps } from './card/types'

export const actions: Omit<CardProps, 'onClick'>[] = [
  {
    type: 'USER',
    label: 'Usuarios',
    Icon: UserPlusIcon,
    action: 'Registrar usuario',
    description: 'Agrega un nuevo usuario',
  },
  {
    type: 'GROUP',
    label: 'Grupos',
    Icon: UserGroupIcon,
    action: 'Crear grupo',
    description: 'Crea un nuevo grupo de usuarios',
  },
  {
    type: 'ROUTINE',
    label: 'Rutinas',
    action: 'Crear rutina',
    Icon: ShieldExclamationIcon,
    description: 'Crea una nueva rutina de ejercicios',
  },
  {
    type: 'RECIPE',
    label: 'Recetas',
    action: 'Crear receta',
    Icon: DocumentTextIcon,
    description: 'Crea una nueva receta de comida',
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
