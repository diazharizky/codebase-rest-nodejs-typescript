import * as client from './client'

const collection = 'foo'

export const get = async () => {
  const [con, err] = await client.connect()
  if (err) {
    throw err
  }
  return await client.get(con!.collection(collection))
}

export const create = async <T>(payload: T) => {
  const [con, err] = await client.connect()
  if (err) {
    throw err
  }
  await client.insertOne(con!.collection(collection), payload)
}
