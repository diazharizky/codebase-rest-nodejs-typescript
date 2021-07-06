import { Router } from 'express'
import controllers from './controllers'

const r = Router()

r.get('/categories', controllers.foo.getCategories)

const entryRoute = r.route('/entries')
entryRoute.get(controllers.foo.getEntries)
entryRoute.post(controllers.foo.insertIntoDB)

r.get('/entries/saved', controllers.foo.getFromDB)

export default r
