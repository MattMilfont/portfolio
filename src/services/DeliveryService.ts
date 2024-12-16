import { Delivery } from "@/models/DeliveryModel";

const API_URL = "/api/deliveries";

export const DeliveryService = {
  async fetchDeliveries(): Promise<Delivery[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao buscar entregas");
      }
      const data: Delivery[] = await response.json();
      return data;
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },

  async addDelivery(
    destination: string,
    arrivalDate: string,
    type: string,
    truckID: number,
    driverID: number,
    value: number,
  ): Promise<void> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          arrivalDate,
          type,
          truckID,
          driverID,
          value,
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Erro ao adicionar entrega");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },

  async deleteDelivery(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}?deliveryID=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir entrega");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },
};
