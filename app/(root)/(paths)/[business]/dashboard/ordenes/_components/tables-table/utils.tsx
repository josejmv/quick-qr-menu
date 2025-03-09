// main tools
import dynamic from 'next/dynamic'

const importDeleteTableComponent = dynamic(
  () =>
    import('@/_components/molecules/confirm-delete-table').then(
      (mod) => mod.ConfirmDeleteTable
    ),
  { loading: () => <p>CARGANDO</p> }
)
const importUpdateTableComponent = dynamic(
  () =>
    import('@/_components/molecules/update-table').then(
      (mod) => mod.UpdateTable
    ),
  { loading: () => <p>CARGANDO</p> }
)

export const orderCrudCases = {
  DELETE: importDeleteTableComponent,
  UPDATE: importUpdateTableComponent,
}
