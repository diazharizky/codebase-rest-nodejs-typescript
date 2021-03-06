import publicapis from '../services/publicapis'
import mongo from '../db/mongo'

export const paginate = <T>(array: T[], page: number, size: number): T[] =>
  array.slice((page - 1) * size, page * size)

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

  getFromDB: async () => {
    const [data, err] = await mongo.foo.get()
    if (err) {
      throw err
    }
    return data
  },

  insertIntoDB: async (payload: {}) => await mongo.foo.create(payload),
}

export default f
