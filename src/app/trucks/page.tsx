"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";
import { Truck, TruckModel } from "@/models/TruckModel";
import { TruckService } from "@/services/TruckService";

export default function TrucksPage() {
  const [model, setNewTruck] = useState("");
  const [truckID, setDeleteTruck] = useState<number | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeleteTruck = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      await TruckService.deleteTruck(id);
      fetchTrucks();
      setMessage("Caminhão excluído com sucesso");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewTruck = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      await TruckService.addTruck(model); 
      fetchTrucks();
      setMessage("Caminhão adicionado com sucesso");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrucks = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await TruckService.fetchTrucks();
      const trucksData = data.map(
        (truck) => new TruckModel(truck.truckID, truck.model) 
      );
      setTrucks(trucksData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="card-header bg-primary">
              <h2 className="m-2 text-light">Caminhões</h2>
            </div>
            <div className="m-3">
              <p>
                Nessa seção de caminhões você pode adicionar novos modelos e deletar os caminhões que não estão
                mais na frota.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-6 offset-md-1">
            <table className="table table-striped ">
              <thead>
                <tr className="text-center">
                  <th>ID do Caminhão</th>
                  <th>Modelo do Caminhão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map((truck) => (
                  <tr key={truck.truckID} className="text-center">
                    <td>{truck.truckID}</td>
                    <td>{truck.model}</td>
                    <td>
                      <a
                        className="btn btn-danger"
                        onClick={() => fetchDeleteTruck(truck.truckID)}
                      >
                        X
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary">
                <h5 className="m-2 text-light">
                  <b>Criar novo Caminhão</b>
                </h5>
              </div>
              <div className="m-3">
              {isLoading && <p>Carregando...</p>}
              {message && 
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="alert alert-success text-center">
                      <p style={{ color: "green" }}>{message}</p>
                    </div>
                  </div>
                </div>
              }
              {error && 
                <div className="row">
                  <div className="col-md-12">
                    <div className="alert alert-danger text-center">
                      <p style={{ color: "red" }}>{error}</p>
                    </div>
                  </div>
                </div>
              }
                <label htmlFor="text" className="form-label">
                  <b>Modelo do caminhão</b>
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="modelNewTruck"
                  value={model}
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
