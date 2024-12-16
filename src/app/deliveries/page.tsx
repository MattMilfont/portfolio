"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";

interface Delivery {
  deliveryID: number;
  destination: string;
  origin: string;
  departureDate: string;
  arrivalDate: string;
  name: string;
  model: string;
  type: string;
}

interface Truck {
  truckID: number;
  model: string;
}

export default function DeliveriesPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [type, setType] = useState("");
  const [truck, setTruck] = useState("");
  const [driver, setDriver] = useState("");
  const [trucks, setTrucks] = useState<Truck[]>([]);

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

  const typeOptions = ["Eletronicos", "Combustivel", "Comum"];

  const destinationOptions = [
    "Nordeste",
    "Norte",
    "Sudeste",
    "Sul",
    "Centro-oeste",
  ];

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
              <h2>Entregas</h2>
              <p>
                Nessa seção de entregas você pode criar novas entregas, editar
                aquelas que já foram cadastradas e deletar as entregas que estão
                erradas.
              </p>
              {/* {isLoading && <p>Carregando...</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>} */}
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-5 offset-md-1">
            <div className="card">
              <div className="m-3">
                <h5 className="mb-3">
                  <b>Nova Entrega</b>
                </h5>
                <label htmlFor="text" className="form-label">
                  <b>Destino</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">Selecione o Destino</option>
                  {destinationOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="text" className="form-label mt-1">
                  <b>Data de Chegada</b>
                </label>
                <input
                  type="date"
                  className="form-control mt-1"
                  id="arrivalDate"
                  value={arrivalDate}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
                <label htmlFor="text" className="form-label mt-1">
                  <b>Tipo de carga</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="type"
                  value={type}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">Selecione o Tipo de Carga</option>
                  {typeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label htmlFor="text" className="form-label mt-1">
                  <b>Caminhão</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="truck"
                  value={truck}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">Selecione o Tipo de Carga</option>
                  {trucks.map((option) => (
                    <option key={option.truckID} value={option.truckID}>
                      {option.truckID} -{option.model}
                    </option>
                  ))}
                </select>
                <label htmlFor="text" className="form-label mt-1">
                  <b>Motorista</b>
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
