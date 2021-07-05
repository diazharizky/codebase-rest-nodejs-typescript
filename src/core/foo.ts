import publicapis from '../services/publicapis'

const paginate = (array: [], page: number, size: number) => {
  return array.slice((page - 1) * size, page * size)
}

const c = {
  getCategories: () => {
    return publicapis.getCategories()
  },

  getEntries: async (page: number, size: number, category?: string) => {
    const [entries, err] = await publicapis.getEntries(category)
    if (err) {
      return [null, err]
    }
    return [paginate(entries, page, size)]
  },
}

export default c
