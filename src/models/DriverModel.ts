export interface Driver {
  driverID: number;
  name: string;
}

export class DriverModel implements Driver {
  driverID: number;
  name: string;

  constructor(driverID: number, name: string) {
    this.driverID = driverID;
    this.name = name;
  }
}
