// types
import type { DishCategoryDataType } from './dish-category'
import type { MenuDataType } from './menu'

export type DishDataType = {
  _id: string
  name: string
  visible: boolean
  basePrice: number
  menu: MenuDataType
  description: string
  currentPrice: number
  category: DishCategoryDataType
}
