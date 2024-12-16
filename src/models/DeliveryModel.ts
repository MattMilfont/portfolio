export interface Delivery {
  deliveryID: number;
  destination: string;
  origin: string;
  departureDate: string;
  arrivalDate: string;
  name: string;
  model: string;
  type: string;
  value: number;
}

export class DeliveryModel implements Delivery {
  deliveryID: number;
  destination: string;
  origin: string;
  departureDate: string;
  arrivalDate: string;
  name: string;
  model: string;
  type: string;
  value: number;

  constructor(
    deliveryID: number,
    destination: string,
    origin: string,
    departureDate: string,
    arrivalDate: string,
    name: string,
    model: string,
    type: string,
    value: number
  ) {
    this.deliveryID = deliveryID;
    this.destination = destination;
    this.origin = origin;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.name = name;
    this.model = model;
    this.type = type;
    this.value = value;
  }
}
