import { Request, Response, NextFunction } from 'express'
import { ErrorX } from '../../modules/error'
import log from '../../utils/log'

const middleware = () => {
  const f = (err: ErrorX, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    log.error({
      message: err.message || 'exception_occured',
      error: err,
      stacktrace: err.stack,
    })
    res.status(err.code || 500).send(err.message || 'Internal server error')
  }
  return f
}

export default middleware
