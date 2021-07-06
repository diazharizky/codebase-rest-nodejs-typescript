import client from './client'

export default {
  getCategories: () => {
    return client.get('/categories')
  },

  getEntries: async (category?: string) => {
    const [res, err] = await client.get('/entries', {
      params: { category },
    })
    if (err) {
      return [null, err]
    }
    if (!res.entries) {
      return [[]]
    }
    return [res.entries]
  },
}
