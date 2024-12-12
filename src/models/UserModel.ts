import { User } from "../types/UserTypes";

export class UserModel implements User {
  id: string;
  nome: string;
  cpf: string;
  senha: string;

  constructor(id: string, nome: string, cpf: string, senha: string) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.senha = senha;
  }

  // Método de exemplo
  maskCPF(): string {
    return this.cpf.replace(/(\d{3})\d{3}(\d{3})/, "$1***$2");
  }
}
