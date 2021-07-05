import client from './client'

export default {
  getCategories: () => client.get('/categories'),

  getEntries: async (category?: string) => {
    const [res, err] = await client.get('/entries', {
      params: { category },
    })
    if (err) {
      return [null, err]
    }
    return [res.entries]
  },
}
