import { PrismaClient } from '../generated/prisma/client';
import { jwtSign, verifyPassword } from "../helpers/auth.helper";
import { LoginResponse } from "../types/auth.type";
import {ErrorResponse} from "../types/common.type";

const prisma = new PrismaClient();

export const authService = {
  login: async (
    email: string,
    password: string,
  ): Promise<LoginResponse | ErrorResponse> => {
    const user = await prisma.users.findFirst({
      where: {
        email,
      }
    });

    if (!user) {
      throw new Error('Invalid email');
    }

    const verifyPass = verifyPassword(user, {
      email,
      password
    });

    if (!verifyPass) {
      return {
        status: 401,
        message: 'Email or password is incorrect'
      }
    }

    const token: string = jwtSign(verifyPass);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
}