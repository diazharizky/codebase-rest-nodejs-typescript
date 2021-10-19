export class ErrorX extends Error {
  code?: number;
  data?: any;
  serviceName?: string;

  constructor(message: string, code?: number, err?: Error) {
    super(message)
    this.code = code
    this.stack = err && err.stack
  }
}

export const BadRequest = (message: string = 'BadRequest', err?: Error) =>
  new ErrorX(message, 400, err)

export const NotFound = (message: string = 'NotFound', err?: Error) =>
  new ErrorX(message, 404, err)

export const ExternalDependencyFailure = (
  message: string = 'ExternalDependencyFailure',
  err?: Error
) => new ErrorX(message, 424, err)

export const InternalServerError = (
  message: string = 'InternalServerError',
  err?: Error
) => new ErrorX(message, 500, err)

export const BadGateway = (message: string = 'BadGateway', err?: Error) =>
  new ErrorX(message, 502, err)
