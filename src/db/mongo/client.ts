import config from 'config'
import * as mongo from 'mongodb'
import { InternalServerError, NotFound } from '../../errors'

export const connect = async (): Promise<[mongo.Db | null, Error]> => {
  let con = null
  let err
  try {
    con = (
      await mongo.MongoClient.connect(config.get('db.mongo'), {
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      })
    ).db()
  } catch (e) {
    err = e
    if (e instanceof mongo.MongoServerSelectionError) {
      err = InternalServerError('Cannot initialize Mongo connection', e)
    }
  }
  return [con, err]
}

export const get = async <T>(
  col: mongo.Collection,
  filter?: mongo.FilterQuery<T>
): Promise<[T[], Error]> => {
  let res
  let err
  try {
    res = await col.find(filter).toArray()
  } catch (e) {
    err = e
  }
  return [res || [], err]
}

export const getOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>
): Promise<[T | null, Error]> => {
  let res
  let err
  try {
    res = await col.findOne(filter)
  } catch (e) {
    err = e
  }
  if (!res) {
    return [null, NotFound('Document not found')]
  }
  return [res, err]
}

export const insertOne = async <T>(
  col: mongo.Collection,
  payload: T
): Promise<[null, Error]> => {
  let err
  try {
    await col.insertOne(payload)
  } catch (e) {
    err = e
  }
  return [null, err]
}

export const updateOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>,
  payload: T
): Promise<[null, Error]> => {
  let err
  try {
    await col.updateOne(filter, payload)
  } catch (e) {
    err = e
  }
  return [null, err]
}

export const deleteOne = async <T>(
  col: mongo.Collection,
  filter: mongo.FilterQuery<T>
): Promise<[null, Error]> => {
  let err
  try {
    await col.deleteOne(filter)
  } catch (e) {
    err = e
  }
  return [null, err]
}

export default connect
