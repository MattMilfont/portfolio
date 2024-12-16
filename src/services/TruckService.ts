import { Truck } from "@/models/TruckModel";

const API_URL = "/api/trucks";

export const TruckService = {
  async fetchTrucks(): Promise<Truck[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao buscar caminhões");
      }
      const data: Truck[] = await response.json();
      return data;
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },

  async addTruck(model: string): Promise<void> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model }),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar caminhão");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },

  async deleteTruck(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}?truckID=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir caminhão");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },
};
