import { Request, ResponseToolkit } from '@hapi/hapi';
import { generateToken } from '../helpers/auth.helper';

export const authController = {
  login: async (request: Request, h: ResponseToolkit) => {
    const { username, password } = request.payload as {
      username: string;
      password: string;
    };

    if (username === 'admin' && password === 'password') {
      const token = generateToken({ userId: 1, username });
      return h.response({ token });
    }

    return h.response({ error: 'Invalid credentials' }).code(401);
  }
};
