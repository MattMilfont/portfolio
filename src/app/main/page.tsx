"use client";

import { useState } from "react";

export default function MainPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDeliveries = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/deliveries");
      if (!response.ok) throw new Error("Erro ao buscar entregas");

      const data = await response.json();
      setDeliveries(data);
      setMessage("Entregas carregadas com sucesso");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Bem-vindo à página principal!</h1>
      <p>Esta é a página main.</p>

      <button onClick={handleGetDeliveries} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Buscar"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {deliveries.map((delivery, index) => (
          <li key={index}>{JSON.stringify(delivery)}</li>
        ))}
      </ul>
    </div>
  );
}
