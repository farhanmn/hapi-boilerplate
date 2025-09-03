import { Request, ResponseToolkit } from '@hapi/hapi';
import { userService } from "../services/user.service";

export const userController = {
  getUser: async (request: Request, h: ResponseToolkit) => {
    const users = await userService.getUser(
      request.params.name ?? "",
      request.params.page ?? 1,
      request.params.limit ?? 10,
    )

    if (!users.data) {
      return h.response({
        success: false,
        message: 'User not found',
        data: null
      })
    }

    return h.response({
      success: true,
      data: users.data,
      metadata: users.metadata
    })
  }
}
