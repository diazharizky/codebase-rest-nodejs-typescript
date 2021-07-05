import { Request, Response } from 'express'
import core from '../../core'

const r = {
  getCategories: async (_: Request, res: Response) => {
    const [categories, err] = await core.foo.getCategories()
    if (err) {
      throw err
    }
    res.status(200).json(categories)
  },

  getEntries: async (req: Request, res: Response) => {
    const category = req.query.category as string
    const page = parseInt(req.query.page as string, 10) || 1
    const size = parseInt(req.query.size as string, 10) || 10
    const [entries, err] = await core.foo.getEntries(page, size, category)
    if (err) {
      throw err
    }
    res.status(200).json(entries)
  },
}

export default r
