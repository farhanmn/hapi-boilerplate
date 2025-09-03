import { userController } from '../controllers/user.controller';
import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';

export const userRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    options: {
      validate: {
        query: Joi.object({
          name: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          const validationError = error as Joi.ValidationError;
          return h.response({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation Error',
            details: validationError.details.map((detail) => ({
              field: detail.path.join('.'),
              message: detail.message
            }))
          })
            .code(400)
            .takeover()
        }
      }
    },
    handler: userController.getUser
  }
];
