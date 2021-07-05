import publicapis from '../services/publicapis'
import mongo from '../db/mongo'

const paginate = (array: [], page: number, size: number) => {
  return array.slice((page - 1) * size, page * size)
}

const f = {
  getCategories: async () => {
    const [data, err] = await publicapis.getCategories()
    if (err) {
      throw err
    }
    return data
  },

  getEntries: async (page: number, size: number, category?: string) => {
    const [entries, err] = await publicapis.getEntries(category)
    if (err) {
      throw err
    }
    return paginate(entries, page, size)
  },

  insertIntoDB: async (payload: {}) => {
    const err = await mongo.foo.create(payload)
    if (err) {
      throw err
    }
  },

  getFromDB: async () => {
    const [data, err] = await mongo.foo.get()
    if (err) {
      throw err
    }
    return data
  },
}

export default f
