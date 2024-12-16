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
  secure: number;
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
  secure: number;


  constructor(
    deliveryID: number,
    destination: string,
    origin: string,
    departureDate: string,
    arrivalDate: string,
    name: string,
    model: string,
    type: string,
    value: number,
    secure: number
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
    this.secure = secure;
  }
}
