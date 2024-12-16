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
};
