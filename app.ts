import express from 'express'
import 'express-async-errors'
import server from './src/routes/router'
import catchMiddleware from './src/routes/middlewares/catch'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(server)
app.use(catchMiddleware())

export default app
