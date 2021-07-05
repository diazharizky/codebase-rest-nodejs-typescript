import { Router } from 'express'
import controllers from './controllers'

const r = Router()

r.get('/categories', controllers.foo.getCategories)
r.get('/entries', controllers.foo.getEntries)

const dbRoute = r.route('/db')
dbRoute.get(controllers.foo.getFromDB)
dbRoute.post(controllers.foo.insertIntoDB)

export default r
