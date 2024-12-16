import { Driver } from "@/models/DriverModel";

const API_URL = "/api/drivers";

export const DriverService = {
  async fetchDrivers(): Promise<Driver[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao buscar motoristas");
      }
      const data: Driver[] = await response.json();
      return data;
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },
  async addDriver(name: string): Promise<void> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar Motorista");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },

  async deleteDriver(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}?driverID=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir motorista");
      }
    } catch (err: unknown) {
      throw err instanceof Error ? err : new Error("Erro desconhecido");
    }
  },
};
