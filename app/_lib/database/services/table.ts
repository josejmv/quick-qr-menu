// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import TableModel from '@/_lib/database/models/table'

// types
import type { TableDataType } from '@/_types/models/table'

export const createTable = async (table: TableDataType) => {
  await dbConnect()
  const tableResponse = await TableModel.create(table).catch((error) => error)

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType
}
