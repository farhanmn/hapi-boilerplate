import jwt from "jsonwebtoken";
import { User } from "../types/user.type";
import { LoginRequest } from "../types/auth.type";
import { match } from "./crypto.helper";
import {VerificationUser} from "../types/auth.type";

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '1d'
  });
};

export const verifyPassword = (
  userData: User,
  loginData: LoginRequest
): VerificationUser | null => {
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

export const jwtSign = (
  user: VerificationUser
) => {
  return jwt.sign(user, SECRET);
}
