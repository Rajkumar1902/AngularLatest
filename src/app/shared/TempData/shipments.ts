import { Shipment } from '../shipment';
import {ShipmentDetails} from '../shipmentdetails';
import {Location} from '../location';
import {LoggingInfo} from '../logginginfo';
import {UnitOfMeasure} from '../unitofmeasure';
import {FreightTerms} from '../freightterms';
import {ShipmentLegs} from '../shipmentlegs';
import {ShipmentContainerInfo} from '../shipmentcontainerinfo';
import {LOCATIONS} from './locations';
import {ShipmentLegStatus} from '../shipmentlegstatus';

export const SHIPMENTS: Shipment[] = [


  /*{
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
      shipmentLegs: null, // ShipmentLegs[];*!/
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
    }*/

  {
    //"$class":"com.jda.shipment.visibility.Shipment",
    "shipmentId":"166942",
    "shipmentUserId": "SHIPEMT123",
    "customerCode":"LOWES",
    "shipmentStatus":"DSTS_SHPM_D_IN_TRANSIT",
    "shipFromLocation":{
      //"$class":"com.jda.shipment.visibility.Location",
      "locationCode":"PP.CN.VENDOR.001",
      "locationName":"Vendor 001 in China",
      "city":"PUTUO QU",
      "country":"CHN",
      //"postalCode":"200331",
      //"latitude":31.2613,
      //"longitude":121.3954
    },
    "shipToLocation":{
      //"$class":"com.jda.shipment.visibility.Location",
      "locationCode":"PP.NJ.DC1",
      "locationName":"Paterson, NJ DC",
      "city":"PATERSON",
      "country":"USA",
      //"postalCode":"07504",
      //"latitude":40.915,
      //"longitude":-74.1475
    },
    "pickupFromDateTime":"2019-01-01T00:00:00.000Z",
    "pickupToDateTime":"2019-01-10T00:00:00.000Z",
    "deliveryFromDateTime":"2019-02-01T00:00:00.000Z",
    "deliveryToDateTime":"2019-02-28T00:00:00.000Z",
    "commodityCode":"*DFT",

    "shipmentLegs":
      [
        {
          //"$class":"com.jda.shipment.visibility.ShipmentLegs",
          "shipmentLegId":"100193812",
          "shipmentSequenceNumber":100,
          "shipFromLocation":{
            //"$class":"com.jda.shipment.visibility.Location",
            "locationCode":"PP.CN.VENDOR.001",
            "locationName":"Vendor 001 in China",
            "city":"PUTUO QU",
            "country":"CHN",
            //"postalCode":"200331",
            //"latitude":31.2613,
            //"longitude":121.3954
          },
          "shipToLocation":{
            //"$class":"com.jda.shipment.visibility.Location",
            "locationCode":"PP.CN.VENDOR.001",
            "locationName":"Shanghai Port",
            "city":"SHANGHAI",
            "country":"CHN",
            //"postalCode":"560996",
            //"latitude":31.1419,
            //"longitude":121.2732
          },
          "pickupArrivalDateTime":"2019-01-01T00:00:00.000Z",
          "pickupDepartureDateTime":"2019-01-10T00:00:00.000Z",
          "dropArrivalDateTime":"2019-02-01T00:00:00.000Z",
          "dropDepartureDateTime":"2019-02-28T00:00:00.000Z",
          "shipmentLegStatus":ShipmentLegStatus.DSTS_SL_D_IN_TRANSIT,

          "computedArrivalDateTimeFromLocation":"2019-01-01T08:00:00.000Z",
          "computedDepartureDateTimeFromLocation":"2019-01-01T08:00:00.000Z",

          "computedArrivalDateTimeToLocation":"2019-01-01T08:34:00.000Z",
          "computedDepartureDateTimeToLocation":"2019-01-01T08:34:00.000Z",

          "actualArrivalDateTimeFromLocation":"2019-01-01T08:00:00.000Z",
          "actualDepartureDateTimeFromLocation":"2019-01-01T08:00:00.000Z",
          "actualArrivalDateTimeToLocation":"2019-01-01T08:34:00.000Z",
          "actualDepartureDateTimeToLocation":"2019-01-01T08:34:00.000Z",

          "carrierCode":"PP.CHN.CARRIER",
          "arrivalDelay": null,
          "departureDelay": null,
          "vesselName": null,
          "voyageNumber": null
          //"load":"resource:com.jda.shipment.visibility.Load#94770"
        },
        {
          //"$class":"com.jda.shipment.visibility.ShipmentLegs",
          "shipmentLegId":"100193895",
          "shipmentSequenceNumber":200,
          "shipFromLocation":{
            //"$class":"com.jda.shipment.visibility.Location",
            "locationCode":"PP.CNSHA",
            "locationName":"Shanghai Port",
            "city":"SHANGHAI",
            "country":"CHN",
            //"postalCode":"560996",
            //"latitude":31.1419,
            //"longitude":121.2732
          },
          "shipToLocation":{
            //"$class":"com.jda.shipment.visibility.Location",
            "locationCode":"PP.CNSHA",
            "locationName":"Savannah Port",
            "city":"SAVANNAH",
            "country":"USA",
            //"postalCode":"31401",
            //"latitude":32.0806,
            //"longitude":-81.0931
          },
          "pickupArrivalDateTime":"2019-01-01T00:00:00.000Z",
          "pickupDepartureDateTime":"2019-01-10T00:00:00.000Z",
          "dropArrivalDateTime":"2019-02-01T00:00:00.000Z",
          "dropDepartureDateTime":"2019-02-28T00:00:00.000Z",
          "shipmentLegStatus":ShipmentLegStatus.DSTS_SL_D_ASSIGNED_TO_CARRIER,

          "computedArrivalDateTimeFromLocation":"2019-01-01T20:00:00.000Z",
          "computedDepartureDateTimeFromLocation":"2019-01-01T20:00:00.000Z",

          "computedArrivalDateTimeToLocation":"2019-01-29T08:00:00.000Z",
          "computedDepartureDateTimeToLocation":"2019-01-29T08:00:00.000Z",

          "actualArrivalDateTimeFromLocation":"2019-01-01T20:00:00.000Z",
          "actualDepartureDateTimeFromLocation":"2019-01-01T20:00:00.000Z",

          "actualArrivalDateTimeToLocation":"2019-01-29T08:00:00.000Z",
          "actualDepartureDateTimeToLocation":"2019-01-29T08:00:00.000Z",

          "carrierCode":"PP.CSCL",
          "arrivalDelay": null,
          "departureDelay": null,
          "vesselName": null,
          "voyageNumber": null
          //"load":"resource:com.jda.shipment.visibility.Load#94771"
        }

      ]
  }
];
