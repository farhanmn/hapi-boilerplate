import { Prisma, PrismaClient } from '../generated/prisma/client';
import { GetUserResponse } from "../types/user.type";
import { Metadata } from "../types/common.type";
import { verifyPassword } from "../helpers/auth.helper";
import {hash} from "../helpers/crypto.helper";

const prisma = new PrismaClient();

export const authService = {
  userCheck: async (
    email: string,
    password: string,
  ) => {
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

    // cont.
  }
}