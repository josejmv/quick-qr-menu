// types
import type { BusinessDataType } from './business'
import type { DishDataType } from './dish'

export type MenuDataType = {
  _id: string
  dishes: DishDataType[]
  business: BusinessDataType
}

export type UpdateMenuDataType = {
  dishes: DishDataType[]
}
