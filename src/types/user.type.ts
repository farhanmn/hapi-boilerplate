interface User {
  id: number;
  name: string;
  email: string;
  password: string | null;
  salt: string | null;
}

interface GetUserResponse {
  id: number;
  name: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export {
  User,
  GetUserResponse,
  LoginRequest
}