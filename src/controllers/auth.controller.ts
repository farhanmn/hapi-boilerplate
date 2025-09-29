import { Request, ResponseToolkit } from '@hapi/hapi';
import { authService } from "../services/auth.service";

export const authController = {
  login: async (request: Request, h: ResponseToolkit) => {
    const { email, password } = request.payload as {
      email: string;
      password: string;
    };

    const login = await authService.login(email, password);

    if (!login) {
      return h.response({ error: 'Invalid credentials' }).code(401);
    }

    return h.response(login).code(200);
  }
};
