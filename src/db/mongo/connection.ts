import config from 'config'
import * as mongo from 'mongodb'
import { InternalServerError } from '../../errors'

const c = (): Promise<[mongo.Db | null, Error | null]> => {
  const connect = mongo.MongoClient.connect(config.get('db.mongo'), {
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })

  const getDB = async (): Promise<[mongo.Db | null, Error | null]> => {
    let con
    let err
    try {
      con = await connect
    } catch (e) {
      if (e instanceof mongo.MongoServerSelectionError) {
        err = InternalServerError('Cannot initialize Mongo connection', e)
      } else {
        err = e
      }
      return [null, err]
    }
    return [con.db(), null]
  }

  return getDB()
}

export default c
