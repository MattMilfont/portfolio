
/* Essa página serve para declarar e definir os serviços que 
são usados para interação de dados com o backend através de API Rest
relacionados ao usuário
*/

export const authentication = async (email: string, password: string) => {

  //Define como respose o resultado do fetch ao backend
  //Substitua o endereço para o endereço utilizado pelo backend
  const response = await fetch("http://localhost:3333/auth", {
    //Seleciona o método da requisição
    method: "POST",

    //Define os headers da requisição
    headers: {
      "Content-Type": "application/json",
    },

    //Define o corpo da requisição utilizando-se do método JSON.stringify para os valores recebidos ao acionar esse serviço
    body: JSON.stringify({ email, password }),
  });

  return response;
};
