import connect from './connection'

const collection = 'foo'

export const create = async (payload: {}) => {
  const [con, err] = await connect()
  if (err) {
    throw err
  }
  const col = con!.collection(collection)
  await col.insertOne(payload)
}

export const get = async () => {
  const [con, err] = await connect()
  if (err) {
    throw err
  }
  const col = con!.collection(collection)
  const res = await col.find().toArray()
  return [res]
}
