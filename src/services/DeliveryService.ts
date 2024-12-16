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
};
