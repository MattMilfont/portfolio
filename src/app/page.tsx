//Usando a renderização da página toda no cliente
"use client";

//Importando o hook de estado do react
import { useState } from "react";

//Importando o hook de roteamento do next
import { useRouter } from "next/navigation";

//Importando a autenticação do usuário pelo serviço de usuário
import { authentication } from "@/services/UserService";

//Função Principal que carrega a Página de Login
export default function LoginPage() {

  //Declarando os estados que armazenam as variações de valores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //Declarando o roteador para usar na página
  const router = useRouter();

  //Função que executa o login e consulta o serviço de autenticação
  const handleLogin = async () => {

    //Mudanças de estado para login
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      //Consulta o método de autenticação do usuário
      const response = await authentication(email, password);

      //Verifica se aconteceu uma resposta válida
      if (!response.ok) {
        //Tratativa de erro
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro desconhecido");
      }

      //Transforma a resposta em um objeto JSON
      const data = await response.json();

      //Define a mensagem no estado
      setMessage(data.message);

      //Define a sessão
      localStorage.setItem('sessionKey', data.sessionKey); 

      //Redireciona para a rota main
      router.push("/main");
    } catch (err: unknown) {
      
      //Tratativa de erro
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  //Parte visual da Página
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center">
          <img src="../assets/mojave-logo-branco.png" width="80%" />
        </div>
      </div>
      <div className="col-md-8 offset-md-2">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="row text-center">
          <button
            className="btn btn-primary w-80"
            onClick={handleLogin}
            disabled={isLoading}
          >
          {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}
