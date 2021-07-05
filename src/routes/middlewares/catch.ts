import { Request, Response, NextFunction } from 'express'
import log from '../../utils/log'

const middleware = () => {
  const f = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    log.error({
      message: 'exception_occured',
      error: err,
      stacktrace: err.stack,
    })
    res.status(500).send('Internal server error')
  }
  return f
}

export default middleware
