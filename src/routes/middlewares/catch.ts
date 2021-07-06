import { Request, Response, NextFunction } from 'express'
import log from '../../utils/log'
import { AdvancedError } from '../../errors'

const middleware = () => {
  const f = (
    err: AdvancedError,
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(err)
    }
    log.error({
      message: 'exception_occured',
      error: err,
      stacktrace: err.stack,
    })
    res.status(err.code || 500).send(err.message || 'Internal server error')
  }
  return f
}

export default middleware
