import { Router } from 'express'
import controllers from './controllers'

const r = Router()

r.get('/categories', controllers.foo.getCategories)
r.get('/entries', controllers.foo.getEntries)

export default r
