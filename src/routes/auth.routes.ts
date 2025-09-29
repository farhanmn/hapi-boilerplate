import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { authController } from "../controllers/auth.controller";
import { createError } from "../helpers/error.helper";

export const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/login',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
        failAction: createError
      }
    },
    handler: authController.login,
  }
];
