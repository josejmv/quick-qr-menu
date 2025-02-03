// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import MenuModel from '@/_lib/database/models/menu'

// types
import type { MenuDataType, UpdateMenuDataType } from '@/_types/models/menu'

export const generateMenu = async (businessId: string) => {
  await dbConnect()

  const menuResponse = await MenuModel.create({ business: businessId }).catch(
    (error) => error
  )

  if (menuResponse.errors) return menuResponse.errors
  else return JSON.parse(JSON.stringify(menuResponse)) as MenuDataType
}

export const getMenuByBusinessId = async (businessId: string) => {
  await dbConnect()

  const menuResponse = await MenuModel.findOne({ business: businessId }).catch(
    (error) => error
  )

  if (menuResponse.errors) return menuResponse.errors
  else if (!menuResponse) return undefined

  return JSON.parse(JSON.stringify(menuResponse)) as MenuDataType
}

export const updateMenu = async (body: {
  menuId: string
  data: UpdateMenuDataType
}) => {
  await dbConnect()
  const businessResponse = await MenuModel.findByIdAndUpdate(
    body.menuId,
    body.data,
    { new: true }
  ).catch((error) => error)

  if (businessResponse.errors) return businessResponse.errors
  else return JSON.parse(JSON.stringify(businessResponse)) as MenuDataType[]
}
