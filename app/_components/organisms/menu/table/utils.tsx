// main tools
import dynamic from 'next/dynamic'

const importWatchDishDescriptionComponent = dynamic(
  () =>
    import('@/_components/molecules/watch-dish-description').then(
      (mod) => mod.WatchDishDescription
    ),
  { loading: () => <p>CARGANDO</p> }
)

export const dishCrudCases = {
  WATCH: importWatchDishDescriptionComponent,
}
