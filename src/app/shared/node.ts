import {ShipmentLegStatus} from './shipmentlegstatus';

export class Node {
  status: ShipmentLegStatus;
  locationName: string;
  city: string;
  country: string;
  arrivalTime: string;
  departureTime: string;
  delay: number;
  iconStyle: string;
  leftLineStyle: string = "left-line-default";
  rightLineStyle: string = "right-line-default";
  nodeTitleStyle: string = "node-title-enabled";
  leftStatus: ShipmentLegStatus;
  rightStatus: ShipmentLegStatus;
}
