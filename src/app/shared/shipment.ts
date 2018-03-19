import {FreightTerms} from './freightterms';
import {Location} from './location';
import {UnitOfMeasure} from './unitofmeasure';
import {ShipmentContainerInfo} from './shipmentcontainerinfo';
import {ShipmentDetails} from './shipmentdetails';
import {LoggingInfo} from './logginginfo';
import {ShipmentLegs} from './shipmentlegs';

export class Shipment {
  shipmentId: string;
  shipmentUserId:string;
  customerCode: string;
  shipmentStatus: string;
  //freightTerms: FreightTerms;
  shipFromLocation: Location;
  shipToLocation: Location;
  pickupFromDateTime: string;
  pickupToDateTime: string;
  deliveryFromDateTime: string;
  deliveryToDateTime: string;
  commodityCode: string;
  //unitOfMeasure: UnitOfMeasure;
  //shipmentContainerInfo: ShipmentContainerInfo;
  //shipmentDetails: ShipmentDetails[];
  //loggingInfo: LoggingInfo;
  shipmentLegs: ShipmentLegs[];

}


