import { Shipment } from '../shipment';
import {ShipmentDetails} from '../shipmentdetails';
import {Location} from '../location';
import {LoggingInfo} from '../logginginfo';
import {UnitOfMeasure} from '../unitofmeasure';
import {FreightTerms} from '../freightterms';
import {ShipmentLegs} from '../shipmentlegs';
import {ShipmentContainerInfo} from '../shipmentcontainerinfo';
import {LOCATIONS} from './locations';

export const SHIPMENTS: Shipment[] = [
    {
        shipmentId: 'SHP01',
        freightTerms: FreightTerms.FT_COLLECT,
        shipFromLocation: LOCATIONS[0],
        shipToLocation: LOCATIONS[1],
        pickupFromDateTime: '2012-10-16T17:57:28.556094Z',
        pickupToDateTime: '2012-10-16T17:57:28.556094Z',
        deliveryFromDateTime: '2012-10-16T17:57:28.556094Z',
        deliveryToDateTime: '2012-10-16T17:57:28.556094Z',
        commodityCode: 'COM01',
        unitOfMeasure: UnitOfMeasure.UMS_IMPERIAL,
        shipmentContainerInfo: null, // ShipmentContainerInfo;
        shipmentDetails: null, // ShipmentDetails[];
        loggingInfo: null, // LoggingInfo;
        shipmentLegs: null, // ShipmentLegs[];
    },
    {
      shipmentId: 'SHP02',
      freightTerms: FreightTerms.FT_PRE_PAID,
      shipFromLocation: LOCATIONS[2],
      shipToLocation: LOCATIONS[3],
      pickupFromDateTime: '2015-05-16T17:57:28.556094Z',
      pickupToDateTime: '2015-05-18T17:57:28.556094Z',
      deliveryFromDateTime: '2015-05-19T17:57:28.556094Z',
      deliveryToDateTime: '2015-05-21T17:57:28.556094Z',
      commodityCode: 'COM02',
      unitOfMeasure: UnitOfMeasure.UMS_METRIC,
      shipmentContainerInfo: null, // ShipmentContainerInfo;
      shipmentDetails: null, // ShipmentDetails[];
      loggingInfo: null, // LoggingInfo;
      shipmentLegs: null, // ShipmentLegs[];
    }
];
