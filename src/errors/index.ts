export class AdvancedError extends Error {
  code: number;
  error?: Error;

  constructor(code: number, message: string, err?: Error) {
    super(message)
    this.code = code
    this.error = err
  }
}

export const InternalServerError = (message: string, err?: Error) =>
  new AdvancedError(500, message, err)

export const NotFound = (message: string, err?: Error) =>
  new AdvancedError(404, message, err)

export const BadRequest = (message: string, err?: Error) =>
  new AdvancedError(400, message, err)

export const BadGateway = (message: string, err?: Error) =>
  new AdvancedError(502, message, err)
