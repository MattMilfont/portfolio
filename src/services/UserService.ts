import { User, UserModel } from "../models/UserModel";

export const getUsers = async (): Promise<UserModel[]> => {
  const response = await fetch("/api/users", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  const users: User[] = await response.json();

  return users.map(
    (user) => new UserModel(user.userID, user.name, user.email, user.password)
  );
};
