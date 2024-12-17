"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Correção: importando do 'next/navigation' para garantir o funcionamento

import { Delivery, DeliveryModel } from "@/models/DeliveryModel";
import Header from "@/components/header";
import { DeliveryService } from "@/services/DeliveryService";
import { formatDate, formatFloatToCurrency } from "@/controllers/deliveriesController";

export default function MainPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(0);
  const [arrivalDate, setArrivalDate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter(); 

  const checkAuthentication = async () => {
    const sessionKey = localStorage.getItem("sessionKey");  
    
    if (!sessionKey) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
      checkAuthentication();  
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchDeliveries();
    }
  }, [isAuthenticated]);

  const handleEditing = (deliveryID: number) => {
    setIsEditing(deliveryID);
  };

  const fetchUpdateDelivery = async (deliveryID: number) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      await DeliveryService.updateDelivery(deliveryID, arrivalDate); 
      fetchDeliveries();
      setMessage("Entrega editada com sucesso");
      setIsEditing(0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

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
            delivery.secure
          )
      );
      setDeliveries(deliveriesData);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

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
          {message && (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="alert alert-success text-center">
                  <p style={{ color: "green" }}>{message}</p>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="row">
              <div className="col-md-8 offset-md-2 mt-3 mb-3">
                <div className="alert alert-danger text-center">
                  <p style={{ color: "red" }}>{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-10 offset-md-1 mb-4">
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
                isEditing === delivery.deliveryID ? (
                <tr key={delivery.deliveryID} className="align-middle">
                  <td>
                    {delivery.type === "Combustível" && <i className="bi bi-fire m-2"></i> } 
                    {delivery.value >= 30000 && <i className="bi bi-cash-stack m-2"></i> }
                    {delivery.secure === 1 && <i className="bi bi-lock-fill m-2"></i>}
                  </td>
                  <td>{delivery.deliveryID}</td>
                  <td>{delivery.destination}</td>
                  <td>{delivery.type}</td>
                  <td>
                    <input
                      type="date"
                      className="form-control mt-1"
                      id="arrivalDate"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      required
                    />
                  </td>
                  <td>{delivery.name}</td>
                  <td>{delivery.model}</td>
                  <td>{formatFloatToCurrency(delivery.value)}</td>
                  <td><button className="btn btn-success" onClick={() => fetchUpdateDelivery(delivery.deliveryID)}>Salvar</button><button className="btn btn-danger m-3" onClick={() => handleEditing(0)}>Cancelar</button></td>
                </tr>
                ) : (
                  <tr key={delivery.deliveryID} className="align-middle">
                  <td>
                    {delivery.type === "Combustível" && <i className="bi bi-fire m-2"></i> } 
                    {delivery.value >= 30000 && <i className="bi bi-cash-stack m-2"></i> }
                    {delivery.secure === 1 && <i className="bi bi-lock-fill m-2"></i>}
                  </td>
                  <td>{delivery.deliveryID}</td>
                  <td>{delivery.destination}</td>
                  <td>{delivery.type}</td>
                  <td>{formatDate(delivery.arrivalDate)}</td>
                  <td>{delivery.name}</td>
                  <td>{delivery.model}</td>
                  <td>{formatFloatToCurrency(delivery.value)}</td>
                  <td><button className="btn btn-warning" onClick={() => handleEditing(delivery.deliveryID)}>Editar</button><button className="btn btn-danger m-3" onClick={() => fetchDeleteDelivery(delivery.deliveryID)}>X</button></td>
                </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
