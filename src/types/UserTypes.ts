export interface User {
  id: string;
  nome: string;
  cpf: string;
  senha: string;
}

export type UserRequest = Omit<User, "id">;
