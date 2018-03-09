import {Location} from './location';
import { ShipmentLegStatus} from './shipmentlegstatus';
import {ShipperService} from '../services/shipper.service';
import {Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export abstract class ShipmentLegs {
  shipmentLegId: string;
  shipmentSequenceNumber: number;
  shipFromLocation: Location;
  shipToLocation: Location;
  pickupArrivalDateTime: string;
  pickupDepartureDateTime: string;
  dropArrivalDateTime: string;
  dropDepartureDateTime: string;
  shipmentLegStatus: ShipmentLegStatus;
  computedArrivalDateTimeFromLocation: string;
  computedDepartureDateTimeFromLocation: string;
  computedArrivalDateTimeToLocation: string;
  computedDepartureDateTimeToLocation: string;
  actualArrivalDateTimeFromLocation: string;
  actualDepartureDateTimeFromLocation: string;
  actualArrivalDateTimeToLocation: string;
  actualDepartureDateTimeToLocation: string;
  arrivalDelay: number;
  departureDelay: number;
  // Load load optional
}
