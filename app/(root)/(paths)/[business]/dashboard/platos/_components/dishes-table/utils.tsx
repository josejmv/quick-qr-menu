// main tools
import dynamic from 'next/dynamic'

const importCreateDishComponent = dynamic(
  () =>
    import('@/_components/molecules/create-dish').then((mod) => mod.CreateDish),
  { loading: () => <p>CARGANDO</p> }
)
const importUpdateDishComponent = dynamic(
  () =>
    import('@/_components/molecules/update-dish').then((mod) => mod.UpdateDish),
  { loading: () => <p>CARGANDO</p> }
)
const importDeleteDishComponent = dynamic(
  () =>
    import('@/_components/molecules/confirm-delete-dish').then(
      (mod) => mod.ConfirmDeleteDish
    ),
  { loading: () => <p>CARGANDO</p> }
)

export const dishCrudCases = {
  CREATE: importCreateDishComponent,
  UPDATE: importUpdateDishComponent,
  DELETE: importDeleteDishComponent,
}
