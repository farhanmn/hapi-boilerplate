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

export {
  User,
  GetUserResponse
}