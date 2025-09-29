import type { ValidationError } from 'joi';
import type {Request, ReqRefDefaults, ResponseToolkit} from '@hapi/hapi';

export function createError(
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
  error: Error | undefined
) {
  const validationError = error as ValidationError;

  return h
    .response({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation Error',
      details: validationError.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    })
    .code(400)
    .takeover();
}
