import {Location} from './location';
import { ShipmentLegStatus} from './shipmentlegstatus';

export abstract class ShipmentLegs {
  shipmentLegId: string;
  shipmentSequenceNumber: number;
  shipFromLocation: Location
  shipToLocation: Location;
  pickupArrivalDateTime: string;
  pickupDepartureDateTime: string;
  dropArrivalDateTime: string;
  dropDepartureDateTime: string;
  shipmentLegStatus: ShipmentLegStatus;
  // Load load optional
}
