import config from 'config'
import * as mongo from 'mongodb'
import { ErrorX, InternalServerError, NotFound } from '../../modules/error'

const getMongoURI = (host: string, port: string, dbName: string) =>
  `mongodb://${host}:${port}/${dbName}`

export const connect = async (): Promise<[mongo.Db | null, ErrorX?]> => {
  let con: mongo.Db | null = null
  let err: ErrorX | undefined
  const dbURI = getMongoURI(
    config.get('db.mongo.host'),
    config.get('db.mongo.port'),
    config.get('db.mongo.database')
  )
  const maxPoolSize = parseInt(config.get('db.mongo.pool.max_size'), 10) || 10
  try {
    con = (
      await mongo.MongoClient.connect(dbURI, {
        maxPoolSize,
        minPoolSize: 0,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      })
    ).db()
  } catch (e) {
    err = InternalServerError('Mongo error')
    if (e instanceof mongo.MongoServerSelectionError) {
      err = InternalServerError('Cannot initialize Mongo connection', e)
    } else {
      err.data = e
    }
  }
  return [con, err]
}

export const get = async <T>(
  col: mongo.Collection,
  filter?: mongo.FilterQuery<T>
): Promise<[T[], ErrorX?]> => {
  let res
  let err: ErrorX | undefined
  try {
    res = await col.find(filter).toArray()
  } catch (e) {
    err = InternalServerError('Mongo error')
    err.data = e
  }
  return [res || [], err]
}

export const getOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>
): Promise<[T | null, ErrorX?]> => {
  let res
  let err: ErrorX | undefined
  try {
    res = await col.findOne(filter)
  } catch (e) {
    err = InternalServerError('Mongo error')
    err.data = e
  }
  if (!res) {
    return [null, NotFound('Document not found')]
  }
  return [res, err]
}

export const insertOne = async <T>(
  col: mongo.Collection,
  data: T
): Promise<[null, ErrorX?]> => {
  let err: ErrorX | undefined
  try {
    await col.insertOne(data)
  } catch (e) {
    err = InternalServerError('Mongo error')
    err.data = e
  }
  return [null, err]
}

export const updateOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>,
  data: T
): Promise<[null, ErrorX?]> => {
  let err: ErrorX | undefined
  try {
    await col.updateOne(filter, data)
  } catch (e) {
    err = InternalServerError('Mongo error')
    err.data = e
  }
  return [null, err]
}

export const deleteOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>
): Promise<[null, ErrorX?]> => {
  let err: ErrorX | undefined
  try {
    await col.deleteOne(filter)
  } catch (e) {
    err = InternalServerError('Mongo error')
    err.data = e
  }
  return [null, err]
}

export default connect
