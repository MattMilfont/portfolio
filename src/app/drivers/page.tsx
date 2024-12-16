"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";
import { Driver, DriverModel } from "@/models/DriverModel";
import { DriverService } from "@/services/DriverService";

export default function DriversPage() {
  const [name, setNewDriver] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeleteDriver = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      await DriverService.deleteDriver(id);
      fetchDrivers();
      setMessage("Motorista excluído com sucesso");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewDriver = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      await DriverService.addDriver(name);
      setMessage("Motorista adicionado com sucesso");
      fetchDrivers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDrivers = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await DriverService.fetchDrivers();
      const driversData = data.map(
        (driver) => new DriverModel(driver.driverID, driver.name)
      );
      setDrivers(driversData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
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
              <h2 className="m-2 text-light">Motoristas</h2>
            </div>
            <div className="m-3">
              <p>
                Nessa seção de motoristas você pode adicionar novos motoristas,
                editar aqueles que já tem e deletar os nomes que não estão mais
                na empresa.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-6 offset-md-1">
            <table className="table table-striped ">
              <thead>
                <tr className="text-center">
                  <th>ID do Motorista</th>
                  <th>Nome </th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.driverID} className="text-center">
                    <td>{driver.driverID}</td>
                    <td>{driver.name}</td>
                    <td>
                      <a
                        className="btn btn-danger"
                        onClick={() => fetchDeleteDriver(driver.driverID)}
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
                <h5 className="text-light m-2">
                  <b>Adicionar Motorista</b>
                </h5>
              </div>
              <div className="m-3">
                {isLoading && <p>Carregando...</p>}
                {message && 
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="alert alert-success text-center">
                        <p style={{ color: "green" }}>{message}</p>
                      </div>
                    </div>
                  </div>
                }
                {error && 
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="alert alert-danger text-center">
                        <p style={{ color: "red" }}>{error}</p>
                      </div>
                    </div>
                  </div>
                }
                <label htmlFor="text" className="form-label">
                  <b>Nome do Motorista</b>
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="nameNewDriver"
                  value={name}
                  onChange={(e) => setNewDriver(e.target.value)}
                  required
                />
                <button
                  className="btn btn-primary w-20 text-center mt-3"
                  onClick={fetchNewDriver}
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
