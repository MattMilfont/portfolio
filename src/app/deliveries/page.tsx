"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";

import { Truck, TruckModel } from "@/models/TruckModel";
import { Delivery, DeliveryModel } from "@/models/DeliveryModel";

import { TruckService } from "@/services/TruckService"; // Importando o serviço
import { DriverService } from "@/services/DriverService";
import { Driver, DriverModel } from "@/models/DriverModel";
import { DeliveryService } from "@/services/DeliveryService";
import { destinationOptions, formatCurrency, formatDate, parseCurrencyToNumber, secureOptions, typeOptions, valueCalculation } from "@/controllers/deliveriesController";

export default function DeliveriesPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [value, setValue] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [type, setType] = useState("");
  const [truck, setTruck] = useState("");
  const [driver, setDriver] = useState("");
  const [secure, setSecure] = useState(0);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const fetchNewDelivery = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    console.log(value);

    try {
      console.log(value);
      await DeliveryService.addDelivery(destination, arrivalDate, type, Number(truck), Number(driver), parseCurrencyToNumber(value), Number(secure)); 
      setMessage("Entrega adicionada com sucesso");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const formatFloatToCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setValue(formatCurrency(rawValue));
  };

  const fetchTrucks = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await TruckService.fetchTrucks(); // Usando o serviço
      const trucksData = data.map(
        (truck) => new TruckModel(truck.truckID, truck.model) // Criando instâncias de TruckModel
      );
      setTrucks(trucksData);
      setMessage("Caminhões carregados com sucesso");
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
      const driverData = data.map(
        (driver) => new DriverModel(driver.driverID, driver.name)
      );
      setDrivers(driverData);
      setMessage("Motoristas carregados com sucesso");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDeliveries = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await DeliveryService.fetchDeliveries();
      const deliveriesData = data.map(
        (delivery) =>
          new DeliveryModel(
            delivery.deliveryID,
            delivery.destination,
            delivery.origin,
            delivery.departureDate,
            delivery.arrivalDate,
            delivery.name,
            delivery.model,
            delivery.type,
            delivery.value,
            delivery.secure,
          )
      );
      setDeliveries(deliveriesData);
      setMessage("Entregas carregadas com sucesso");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
    fetchDrivers();
    fetchDeliveries();
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
              <h2>Entregas</h2>
              <p>
                Nessa seção de entregas você pode criar novas entregas, editar
                aquelas que já foram cadastradas e deletar as entregas que estão
                erradas.
              </p>
              {isLoading && <p>Carregando...</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-md-4 offset-md-1">
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
                  onChange={(e) => setArrivalDate(e.target.value)}
                  required
                />
                <label htmlFor="text" className="form-label mt-1">
                  <b>Tipo de carga</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Selecione o Tipo de Carga</option>
                  {typeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {type == "Eletrônicos" 
                  && 
                  <label htmlFor="text" className="form-label mt-1">
                    <b>A carga possui seguro?</b>
                  </label>
                }
                {type == "Eletrônicos" 
                && 
                  <select
                    className="form-control mt-1"
                    id="secure"
                    value={secure}
                    onChange={(e) => setSecure(Number(e.target.value))}
                    required
                  >
                    <option value="">Selecione se a carga tem seguro</option>
                    {secureOptions.map((option, index) => (
                      <option key={index} value={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                }
                <label htmlFor="text" className="form-label mt-1">
                  <b>Caminhão</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="truck"
                  value={truck}
                  onChange={(e) => setTruck(e.target.value)}
                  required
                >
                  <option value="">Selecione o Caminhão</option>
                  {trucks.map((option) => (
                    <option key={option.truckID} value={option.truckID}>
                      {option.truckID} -{option.model}
                    </option>
                  ))}
                </select>
                <label htmlFor="text" className="form-label mt-1">
                  <b>Motorista</b>
                </label>
                <select
                  className="form-control mt-1"
                  id="driver"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  required
                >
                  <option value="">Selecione o Motorista</option>
                  {drivers.map((option) => (
                    <option key={option.driverID} value={option.driverID}>
                      {option.driverID} - {option.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="text" className="form-label mt-1">
                  <b>Valor do Frete</b>
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="value"
                  value={value}
                  onChange={handleValueChange}
                  placeholder="R$ 0,00"
                  required
                />

                <p className="mt-4"><b>Valor total com taxas de destino:</b> {valueCalculation(destination, value)}</p>
                <button
                  className="btn btn-primary w-20 text-center mt-3"
                  onClick={fetchNewDelivery}
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
          <table className="table table-striped">
            <thead className="text-center">
              <tr>
                <th>ID da entrega</th>
                <th>Destino</th>
                <th>Tipo</th>
                <th>Previsão de Chegada</th>
                <th>Motorista</th>
                <th>Caminhão</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {deliveries.map((delivery) => (
                <tr key={delivery.deliveryID}>
                  <td>{delivery.deliveryID}</td>
                  <td>{delivery.destination}</td>
                  <td>{delivery.type}</td>
                  <td>{formatDate(delivery.arrivalDate)}</td>
                  <td>{delivery.name}</td>
                  <td>{delivery.model}</td>
                  <td>{formatFloatToCurrency(delivery.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
