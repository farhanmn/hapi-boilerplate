import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { userController } from '../controllers/user.controller';
import { createError } from "../helpers/error.helper";

export const userRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    options: {
      validate: {
        query: Joi.object({
          name: Joi.string().required(),
        }),
        failAction: createError
      }
    },
    handler: userController.getUser
  }
];
