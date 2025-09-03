import jwt from "jsonwebtoken";
import { LoginRequest, User } from "../types/user.type";
import { match } from "./crypto.helper";

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '1d'
  });
};

export const verifyPassword = (
  userData: User,
  loginData: LoginRequest
) => {
  if (!userData) {
    return null;
  }

  if (match(loginData.password, userData.password, userData.salt)) {
    return {
      id: userData.id,
      sub: userData.id,
      name: userData.name,
      email: userData.email
    };
  }
  return null;
};
