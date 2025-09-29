interface VerificationUser {
  id: number;
  sub: number;
  name: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

export {
  VerificationUser,
  LoginRequest,
  LoginResponse
}