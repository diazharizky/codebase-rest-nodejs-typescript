import connect from './connection'

const collection = 'foo'

export const create = async (payload: {}) => {
  try {
    const con = await connect()
    const col = con.collection(collection)
    await col.insertOne(payload)
  } catch (e) {
    return e
  }
}

export const get = async () => {
  let res
  let err
  try {
    const con = await connect()
    const col = con.collection(collection)
    res = await col.find().toArray()
  } catch (e) {
    err = e
  }
  return [res, err]
}
