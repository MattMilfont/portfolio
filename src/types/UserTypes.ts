export interface User {
  userID: string;
  name: string;
  email: string;
  password: string;
}

export type UserRequest = Omit<User, "id">;
