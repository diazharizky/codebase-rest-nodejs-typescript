import config from 'config'
import { MongoClient } from 'mongodb'

const c = () => {
  const connect = MongoClient.connect(config.get('db.mongo'), {
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })

  const getDB = async () => {
    return (await connect).db()
  }

  return getDB()
}

export default c
