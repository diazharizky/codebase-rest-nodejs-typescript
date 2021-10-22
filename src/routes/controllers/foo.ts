import { Request, Response } from 'express'
import core from '../../core'

const r = {
  getCategories: async (_: Request, res: Response) => {
    const data = await core.foo.getCategories()
    res.status(200).json(data)
  },

  getEntries: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1
    const size = parseInt(req.query.size as string, 10) || 10
    const category = req.query.category as string
    const data = await core.foo.getEntries(page, size, category)
    res.status(200).json(data)
  },

  getFromDB: async (_: Request, res: Response) => {
    const data = await core.foo.getFromDB()
    res.status(200).json(data)
  },

  insertIntoDB: async (req: Request, res: Response) => {
    const payload = req.body
    await core.foo.insertIntoDB(payload)
    res.status(201).json(payload)
  },
}

export default r
