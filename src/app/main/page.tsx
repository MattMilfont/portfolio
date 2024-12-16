"use client";

import { useState, useEffect } from "react";

import { Delivery, DeliveryModel } from "@/models/DeliveryModel";

import Header from "@/components/header";
import { DeliveryService } from "@/services/DeliveryService";

export default function MainPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
  
    return `${day}/${month}/${year}`; 
  }

  const fetchDeleteDelivery = async (id: number) => {
      setIsLoading(true);
      setError(null);
      setMessage(null);
      try {
        await DeliveryService.deleteDelivery(id);
        fetchDeliveries();
        setMessage("Entrega excluída com sucesso");
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
          <h1>Bem-vindo ao Mojave Express Manager</h1>
          <p>
            Esse sistema foi feito para que você possa gerenciar a sua frota de
            caminhões de forma prática e fácil.
          </p>
          <p><b>Legenda do ícones</b></p>
          <p><i className="bi bi-fire"></i> - Carga Perigosa (Combustível)</p>
          <p><i className="bi bi-cash-stack"></i> - Carga Valiosa (Acima de 30k)</p>
          <p><i className="bi bi-lock-fill"></i> - Carga com Seguro</p>
          {isLoading && <p>Carregando...</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="col-md-10 offset-md-1">
          <table className="table table-striped">
            <thead className="text-center">
              <tr>
                <th></th>
                <th>ID da entrega</th>
                <th>Destino</th>
                <th>Tipo</th>
                <th>Previsão de Chegada</th>
                <th>Motorista</th>
                <th>Caminhão</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {deliveries.map((delivery) => (
                <tr key={delivery.deliveryID}>
                  <td>
                    {delivery.type == "Combustível" && <i className="bi bi-fire m-2"></i> } 
                    {delivery.value >= 30000 && <i className="bi bi-cash-stack m-2"></i> }
                    {delivery.secure == 1 && <i className="bi bi-lock-fill m-2"></i>}
                  </td>
                  <td>{delivery.deliveryID}</td>
                  <td>{delivery.destination}</td>
                  <td>{delivery.type}</td>
                  <td>{formatDate(delivery.arrivalDate)}</td>
                  <td>{delivery.name}</td>
                  <td>{delivery.model}</td>
                  <td>{formatFloatToCurrency(delivery.value)}</td>
                  <td><button className="btn btn-danger" onClick={() => fetchDeleteDelivery(delivery.deliveryID)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
