import { User } from "../types/UserTypes";
import { UserModel } from "../models/UserModel";

export const getUsers = async (): Promise<UserModel[]> => {
  const response = await fetch("/api/users", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  // Tipar explicitamente a resposta da API
  const users: User[] = await response.json();

  return users.map(
    (user) => new UserModel(user.id, user.nome, user.cpf, user.senha)
  );
};
