// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import MenuModel from '@/_lib/database/models/menu'

// types
import type { MenuDataType } from '@/_types/models/menu'

export const generateMenu = async (businessId: string) => {
  await dbConnect()

  const menuResponse = await MenuModel.create({ business: businessId }).catch(
    (error) => error
  )

  if (menuResponse.errors) return menuResponse.errors
  else return JSON.parse(JSON.stringify(menuResponse)) as MenuDataType
}
