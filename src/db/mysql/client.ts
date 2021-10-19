import * as knex from 'knex'
import config from 'config'
import { ErrorX } from '../../modules/error'

const getDB = () =>
  knex.default({
    client: 'mariadb',
    connection: {
      host: config.get('mariadb.host'),
      user: config.get('mariadb.user'),
      database: config.get('mariadb.database'),
      password: config.get('mariadb.password'),
    },
  })

export const select = async <T>(table: string): Promise<[T[], ErrorX?]> => {
  let res
  let err
  try {
    res = await getDB().select().from(table)
  } catch (e) {
    err = new ErrorX('MySQL error')
    err.data = e
  }
  return [res || [], err]
}

export const insert = async <T>(
  table: string,
  data: T
): Promise<[null, ErrorX?]> => {
  let err
  try {
    await getDB().insert(data).into(table)
  } catch (e) {
    err = new ErrorX('MySQL error')
    err.data = e
  }
  return [null, err]
}

export const update = async <T>(
  table: string,
  data: T
): Promise<[null, ErrorX?]> => {
  let err
  try {
    await getDB().update(data).from(table)
  } catch (e) {
    err = new ErrorX('MySQL error')
    err.data = e
  }
  return [null, err]
}
