//Usando a renderização da página toda no cliente
"use client";

//Importando o hook de estado do react
import { useState, useEffect } from "react";

//Importando o hook de roteamento do next
import { useRouter } from "next/navigation";

//Importando o Header padrão dos componentes
import Header from "@/components/header";

//Função Principal que carrega a Página Principal
export default function MainPage() {
  //Declarando os estados que armazenam as variações de valores
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //Declarando o roteador para usar na página
  const router = useRouter();

  //Verifica a sessão do usuário
  const checkAuthentication = async () => {
    const sessionKey = localStorage.getItem("sessionKey");

    if (!sessionKey) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  };

  //Chama a função para ser executada no início da função
  useEffect(() => {
    checkAuthentication();
  });
  
  //Parte visual da Página
  return (
    <div>
      <Header title="Mojave Express" />
      <div className="container-fluid">
        <div
          className="col-md-10 offset-md-1 mt-10"
          style={{ paddingTop: "2%" }}
        >
          <h1>Bem-vindo ao Mojave Express Manager</h1>
          <p>
            Esse sistema foi feito para que você possa gerenciar a sua frota de
            caminhões de forma prática e fácil.
          </p>
        </div>
      </div>
    </div>
  );
}
