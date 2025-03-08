// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import DishModel from '@/_lib/database/models/dish'

// types
import type { DishDataType, UpdateDishDataType } from '@/_types/models/dish'

export const createDish = async (data: DishDataType) => {
  await dbConnect()

  const dishResponse = await DishModel.create(data).catch((error) => error)

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const updateDish = async (body: {
  dishId: string
  data: UpdateDishDataType
}) => {
  await dbConnect()

  const dishResponse = await DishModel.findByIdAndUpdate(
    body.dishId,
    body.data,
    { new: true }
  ).catch((error) => error)

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const deleteDish = async (dishId: string) => {
  await dbConnect()

  const dishResponse = await DishModel.findByIdAndDelete(dishId).catch(
    (error) => error
  )

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const getAllDishesByMenuId = async (id: string) => {
  await dbConnect()

  const dishResponse = await DishModel.find({ menu: id }).catch(
    (error) => error
  )

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const getVisibleDishesByMenuId = async (id: string) => {
  await dbConnect()

  const dishResponse = await DishModel.find({ menu: id, visible: true }).catch(
    (error) => error
  )

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const getDishById = async (id: string) => {
  await dbConnect()

  const dishResponse = await DishModel.findById(id).catch((error) => error)

  if (dishResponse.errors) return dishResponse.errors
  else return JSON.parse(JSON.stringify(dishResponse)) as DishDataType
}

export const getDishesByManyIds = async (ids: string[]) => {
  await dbConnect()

  const dishesResponse = await DishModel.find({
    _id: { $in: ids },
  }).catch((error) => error)

  if (dishesResponse.errors) return dishesResponse.errors
  else return JSON.parse(JSON.stringify(dishesResponse)) as DishDataType[]
}
