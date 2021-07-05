import * as express from 'express'
import core from '../../core'

const fn = (req: express.Request, res: express.Response) => {
  const name: string = (req.query.name as string) || 'Fulan'
  const msg = core.foo.fn(name)
  res.status(200).send(msg)
}

export default {
  fn,
}
