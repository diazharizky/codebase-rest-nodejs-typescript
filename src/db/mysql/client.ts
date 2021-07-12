import * as knex from 'knex'
import config from 'config'

const getDB = () =>
  knex.default({
    client: 'mariadb',
    connection: {
      host: config.get('mariadb.host'),
      user: config.get('mariadb.user'),
      password: config.get('mariadb.password'),
      database: config.get('mariadb.database'),
    },
  })

/**
 *
 * @param table table name
 */
export const select = async <T>(table: string): Promise<[T[], Error]> => {
  let res
  let err
  try {
    res = await getDB().select().from(table)
  } catch (e) {
    err = e
  }
  return [res || [], err]
}

/**
 *
 * @param table table name
 * @param payload payload to be inserted
 */
export const insert = async <T>(
  table: string,
  payload: T
): Promise<[null, Error]> => {
  let err
  try {
    await getDB().insert(payload).into(table)
  } catch (e) {
    err = e
  }
  return [null, err]
}

/**
 *
 * @param table table name
 * @param payload payload to be updated
 */
export const update = async <T>(
  table: string,
  payload: T
): Promise<[null, Error]> => {
  let err
  try {
    await getDB().update(payload).from(table)
  } catch (e) {
    err = e
  }
  return [null, err]
}
