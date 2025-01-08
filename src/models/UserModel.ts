/* 
  Esse arquivo é utilizado para definir e estruturar os dados do usuário
  ao definir a interface User, mas também armazena a classe que pode ser utilizada
  para armazenar as informações relacionadas ao Usuário.
*/


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
