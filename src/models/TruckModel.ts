export interface Truck {
  truckID: number;
  model: string;
}

export class TruckModel implements Truck {
  truckID: number;
  model: string;

  constructor(truckID: number, model: string) {
    this.truckID = truckID;
    this.model = model;
  }
}
