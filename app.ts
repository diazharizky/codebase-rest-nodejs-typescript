import express from 'express'
import server from './src/routes/router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/server', server)

export default app
