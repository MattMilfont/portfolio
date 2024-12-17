
export interface User {
  userID: string;
  name: string;
  email: string;
  password: string;
}

export class UserModel implements User {
  userID: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, nome: string, email: string, senha: string) {
    this.userID = id;
    this.name = nome;
    this.email = email;
    this.password = senha;
  }
}
