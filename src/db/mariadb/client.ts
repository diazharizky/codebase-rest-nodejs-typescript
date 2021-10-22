import * as knex from 'knex'
import config from 'config'
import { ErrorX, InternalServerError } from '../../modules/error'

const getDB = () => {
  const maxPoolSize = parseInt(config.get('db.mariadb.pool.max_size'), 10)
  return knex.default({
    client: 'mariadb',
    pool: { min: 0, max: maxPoolSize },
    connection: {
      host: config.get('db.mariadb.host'),
      user: config.get('db.mariadb.user'),
      database: config.get('db.mariadb.database'),
      password: config.get('db.mariadb.password'),
    },
  })
}

export const select = async <T>(table: string): Promise<[T[], ErrorX?]> => {
  let res
  let err
  try {
    res = await getDB().select().from(table)
  } catch (e) {
    err = InternalServerError('MySQL error')
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
    err = InternalServerError('MySQL error')
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
    err = InternalServerError('MySQL error')
    err.data = e
  }
  return [null, err]
}
