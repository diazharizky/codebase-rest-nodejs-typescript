import { Router } from 'express'
import controllers from './controllers'

const router = Router()

router.get('/', (_, res) => {
  res.status(200).send('Hello world!')
})

const foo = router.route('/foo')
foo.get(controllers.foo.fn)

export default router
