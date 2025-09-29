import { Request, ResponseToolkit } from '@hapi/hapi';
import { userService } from "../services/user.service";
import redis from '../plugins/redis.plugins';

export const userController = {
  getUsers: async (request: Request, h: ResponseToolkit) => {
    const users = await userService.getUsers(
      request.params.name ?? "",
      request.params.page ?? 1,
      request.params.limit ?? 10,
    )

    if (!users.data) {
      return h.response({
        success: false,
        message: 'User not found',
        data: null
      }).code(404);
    }

    return h.response({
      success: true,
      data: users.data,
      metadata: users.metadata
    }).code(200);
  },
  getUserById: async (request: Request, h: ResponseToolkit) => {
    const userId = Number(request.params.id);
    const cacheKey = `user:${userId}`;

    const cachedUser = await redis.get(cacheKey);
    if (cachedUser) {
      return h.response({
        success: true,
        data: JSON.parse(cachedUser)
      }).code(200);
    }

    const user = await userService.getUser(
      userId ?? "",
    );

    if (!user) {
      return h.response({ error: 'User not found' }).code(404);
    }

    await redis.set(cacheKey, JSON.stringify(user), 'EX', 60);

    return h.response({
      success: true,
      data: user
    }).code(200);
  }
}
