// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import DishModel from '@/_lib/database/models/dish'

// types
import type { DishDataType } from '@/_types/models/dish'

export const createDish = async (data: DishDataType) => {
  await dbConnect()

  const dishResponse = await DishModel.create(data).catch((error) => error)

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const getDishesByMenuId = async (id: string) => {
  await dbConnect()

  const dishResponse = await DishModel.find({ menu: id }).catch(
    (error) => error
  )

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}
