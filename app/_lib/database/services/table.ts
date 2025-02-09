// main tools
import dbConnect from '@/_lib/database/db-connect'

// models
import TableModel from '@/_lib/database/models/table'

// types
import type { TableDataType, UpdateTableDataType } from '@/_types/models/table'

export const getTable = async (id: string) => {
  await dbConnect()
  const tableResponse = await TableModel.findById(id).catch((error) => error)

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType
}

export const createTable = async (table: TableDataType) => {
  await dbConnect()
  const tableResponse = await TableModel.create(table).catch((error) => error)

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType
}

export const updateTable = async (body: {
  tableId: string
  data: UpdateTableDataType
}) => {
  await dbConnect()
  const tableResponse = await TableModel.findByIdAndUpdate(
    body.tableId,
    body.data,
    { new: true }
  ).catch((error) => error)

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType
}

export const deleteTable = async (tableId: string) => {
  await dbConnect()
  const tableResponse = await TableModel.findByIdAndDelete(tableId).catch(
    (error) => error
  )

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType
}

export const getTablesByBusinessId = async (id: string) => {
  await dbConnect()

  const tableResponse = await TableModel.find({ business: id }).catch(
    (error) => error
  )

  if (tableResponse.errors) return tableResponse.errors
  else return JSON.parse(JSON.stringify(tableResponse)) as TableDataType[]
}
