"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header"; // Caminho relativo ou alias (usando `@`)

// Definição do tipo para os dados de entregas
interface Delivery {
  deliveryID: number;
  destiantion: string;
  origin: string;
  departureDate: string;
  arrivalDate: string;
  type: string;
}

export default function MainPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar entregas da API
  const fetchDeliveries = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/deliveries");
      if (!response.ok) throw new Error("Erro ao buscar entregas");

      const data: Delivery[] = await response.json(); // Especifica o tipo esperado
      setDeliveries(data);
      setMessage("Entregas carregadas com sucesso");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  // Executar fetchDeliveries no carregamento da página
  useEffect(() => {
    fetchDeliveries();
  }, []); // O array vazio faz o useEffect ser executado apenas uma vez

  return (
    <div className="container-fluid">
      <Header title="Truck Delivery" />
      <div className="col-md-8 offset-md-2 mt-3">
        <h1>Bem-vindo à página principal!</h1>
        <p>Esta é a página main.</p>

        {isLoading && <p>Carregando...</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID da entrega</th>
              <th>Destino</th>
              <th>Tipo</th>
              <th>Previsão de Chegada</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={delivery.deliveryID}>
                <td>{delivery.deliveryID}</td>
                <td>{delivery.destiantion}</td>
                <td>{delivery.type}</td>
                <td>{delivery.arrivalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
