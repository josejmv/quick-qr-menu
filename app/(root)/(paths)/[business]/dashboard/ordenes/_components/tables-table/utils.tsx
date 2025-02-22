// main tools
import dynamic from 'next/dynamic'

const importCreateTableComponent = dynamic(
  () =>
    import('@/_components/molecules/create-table').then(
      (mod) => mod.CreateTable
    ),
  { loading: () => <p>CARGANDO</p> }
)
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

export const tableCrudCases = {
  CREATE: importCreateTableComponent,
  DELETE: importDeleteTableComponent,
  UPDATE: importUpdateTableComponent,
}
