"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";

interface Truck {
  truckID: number;
  model: string;
}

export default function TrucksPage() {
  const [newTruckModel, setNewTruck] = useState("");
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewTruck = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTruckModel }),
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrucks = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/trucks");
      if (!response.ok) throw new Error("Erro ao buscar entregas");

      const data: Truck[] = await response.json(); // Especifica o tipo esperado
      setTrucks(data);
      setMessage("Caminhões carregados com sucesso");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  // Executar fetchDeliveries no carregamento da página
  useEffect(() => {
    fetchTrucks();
  }, []);

  return (
    <div>
      <Header title="Mojave Express" />
      <div className="container-fluid">
        <div
          className="col-md-10 offset-md-1 mt-10"
          style={{ paddingTop: "2%" }}
        >
          <div className="card">
            <div className="m-3">
              <h2>Caminhões</h2>
              <p>
                Nessa seção de caminhões você pode adicionar novos modelos,
                editar aqueles que já tem e deletar os caminhões que não estão
                mais na frota.
              </p>
              {/* {isLoading && <p>Carregando...</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>} */}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 offset-md-1">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID do Caminhão</th>
                  <th>Modelo do Caminhão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map((truck) => (
                  <tr key={truck.truckID}>
                    <td>{truck.truckID}</td>
                    <td>{truck.model}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="m-3">
                <h5>
                  <b>Criar novo Caminhão</b>
                </h5>
                <label htmlFor="text" className="form-label">
                  <b>Modelo do caminhão</b>
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="modelNewTruck"
                  value={newTruckModel}
                  onChange={(e) => setNewTruck(e.target.value)}
                  required
                />
                <button
                  className="btn btn-primary w-20 text-center mt-3"
                  onClick={fetchNewTruck}
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
