"use client";

import { useState } from "react";

interface User {
  id: string;
  nome: string;
  cpf: string;
  senha: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      setUsers(data); // Atualiza o estado com os usuários
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>

      {/* Botão para buscar os usuários */}
      <button onClick={fetchUsers} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Buscar Usuários"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </div>
  );
}
