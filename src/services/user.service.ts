import { Prisma, PrismaClient } from '../generated/prisma/client';
import { GetUserResponse } from "../types/user.type";
import { Metadata } from "../types/common.type";

const prisma = new PrismaClient();

export const userService = {
  getUsers: async (
    name?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    data: GetUserResponse[];
    metadata: Metadata;
  }> => {
    const where: Prisma.usersWhereInput | undefined = name
      ? {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
      : undefined;

    const count = await prisma.users.count({ where });
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      metadata: {
        total: count,
        page,
        limit,
      }
    }
  },
  getUser: async (
    id: number
  ): Promise<GetUserResponse | undefined> => {
    const user = await prisma.users.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        id
      }
    });

    if (!user) {
      return undefined;
    }

    return user;
  }
}