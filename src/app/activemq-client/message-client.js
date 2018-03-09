//import { Shipment } from './blockchain-models/Shipment.js';
//import {ShipmentModel} from "./blockchain-models/Shipment";


/*var SERVER_ADDRESS = 'c71dq72j.jda.corp.local';
 var SERVER_PORT = 61613;
 var QUEUE = '/queue/Shipment';*/
soap = require('soap');
var SchemaObject = require('node-schema-object');
var StompClient = require('stomp-client');

var SERVER_ADDRESS = 'in2pmgtm01'; //localhost
var SERVER_PORT = 61613;

var QUEUE = '/queue/Shipment';


var stompClient = new StompClient(SERVER_ADDRESS, SERVER_PORT, '', '', '1.0');
var xml = null;
var url = 'c:\\blockchain\\lab\\TransportationManagerService.wsdl';


stompClient.connect(function() {

  stompClient.subscribe(QUEUE, function (data, headers) {
    xml = data;
    var to_json = require('xmljson').to_json;

    to_json(xml, function (error, data) {
      var eventName = data.CISDocument.EventName;
      console.log(eventName);
     // return;
      //   var eventName = 'ShipmentDelivered';//ShipmentProcessed,LoadTenderAccepted,LoadStopConfirmed,ShipmentDelivered
      handleEvent(eventName, data);
    });
  });
});
function handleEvent(eventName, data) {
  if (eventName == 'ShipmentProcessed') {

    var shipmentId = data.CISDocument.SystemShipmentID;

    onShipmentProcessedEvent(shipmentId);

  } else if (eventName == 'LoadTenderAccepted') {
    var loadId = data.CISDocument.SystemLoadID;

    onLoadTenderAcceptedEvent(loadId);
  }
  else if (eventName == 'LoadStopConfirmed' || eventName == 'LoadStopDelivered') {  //?
    var leg = data.CISDocument.ShipmentLeg;
    //    console.log(shipmentLegArrTm);
    var loadStatus = data.CISDocument.SystemLoadStatus;//data.CISDocument.SystemLoadStatus;"LL_DINTRANS"

    onLoadStopConfirmedOrDelivered(leg, loadStatus, eventName);

  }/*else if(eventName == 'ShipmentDelivered'){

  }*/
  /*else if(eventName == 'LoadStopETARevision'){

  }*/
}

function createUpdateShipmentTrx(legTm, newLoadStatus,newShipStatus,eventName) {

  var updateShipmentTx = new UpdateShipmentPickupDelivery();
  updateShipmentTx.$class = "com.jda.shipment.visibility.UpdateShipmentPickupDelivery";
  updateShipmentTx.shipment = "resource:com.jda.shipment.visibility.Shipment#"+legTm.SystemShipmentID;
  updateShipmentTx.load = "resource:com.jda.shipment.visibility.Load#"+legTm.SystemLoadID;
  updateShipmentTx.newLoadStatus = newLoadStatus;

  updateShipmentTx.newShipmentStatus = newShipStatus;
  updateShipmentTx.shipmentLegId = legTm.Id;
  updateShipmentTx.newShipmentLegStatus = legTm.DisplayStatusEnumVal;

  if(eventName == 'LoadStopConfirmed') {
    if (legTm.PickupArrivalDateTime != null)
      updateShipmentTx.pickupArrivalDateTime = legTm.PickupArrivalDateTime;
    if (legTm.PickupDepartureDateTime != null)
      updateShipmentTx.pickupDepartureDateTime = legTm.PickupDepartureDateTime;
  }
  else {
    if (legTm.DropArrivalDateTime != null)
      updateShipmentTx.dropArrivalDateTime = legTm.DropArrivalDateTime;
    if (legTm.DropDepartureDateTime != null)
      updateShipmentTx.dropDepartureDateTime = legTm.DropDepartureDateTime;
  }
  return updateShipmentTx;
}
function handleEachShipLeg(legTm,loadStatus,eventName) {
  var shipArgs = {EntityType: "ShipmentType", Id: legTm.SystemShipmentID};

  var shipCallback = function (result) {
      var shipTM = result.Entity.Shipment[0];
      var newShipmentStatus = shipTM.DisplayStatusEnumVal;
      var updateShipmentTx = createUpdateShipmentTrx(legTm,loadStatus,newShipmentStatus,eventName);

      //console.log(JSON.stringify(updateShipmentTx));

    writeToBlockChain(updateShipmentTx,'/api/UpdateShipmentPickupDelivery');
    };
  invokeSOAPCall(shipArgs, shipCallback);
}
function onLoadTenderAcceptedEvent(loadId) {
  //var args = {EntityType: "LoadType", Id: "76569", Select: {Collection: [{Name: "ShipmentLeg"}]}};

  var args = {EntityType: "LoadType", Id: loadId, Select: {Collection: [{Name: "ShipmentLeg"}]}};

  var callbackLoad = function (result) {
      var loadTM = result.Entity.Load[0];
      var loadAsset = fillLoad(loadTM);
      var assocateLoadTx = createAssociateLoadTransaction(loadAsset);

      var trxFn = function (result) {
        writeToBlockChain(assocateLoadTx,'/api/AssociateLoadAndShipmentLegs');
      };

      writeToBlockChain(loadAsset,'/api/Load',trxFn); //create load asset in blockchain
    };
  invokeSOAPCall(args, callbackLoad);
}
function onShipmentProcessedEvent(shipmentId) {
  var args = {EntityType: "ShipmentType",Id: shipmentId,Select: {Collection: [{Name: "ShipmentLeg"}, {Name: "Container"}]}};
  //var args = {EntityType: "ShipmentType",Id: "161715"};


  var callback = function (result) {
      // console.log(result)
      var shipTM = result.Entity.Shipment[0];
      var shipmentAsset = fillShipment(shipTM);

      writeToBlockChain(shipmentAsset,'/api/Shipment');

    };
  invokeSOAPCall(args, callback);
}
function onLoadStopConfirmedOrDelivered(leg, loadStatus, eventName) {
  var legArgs = {EntityType: "ShipmentLegType", Id: leg.SystemShipmentLegID}; //'100176875'

  var shipLegCallback = function (result) {
      var legTm = result.Entity.ShipmentLeg[0];
      handleEachShipLeg(legTm,loadStatus,eventName);
    };
  invokeSOAPCall(legArgs, shipLegCallback);
}

function fillLoad(loadTM) {
  var load = new Load();
  load.loadId = loadTM.Id;
  load.carrierCode = loadTM.CarrierCode;
  //load.loadStatus= loadTM.;
  //load.loadId = loadTM.Id;

  var shipmentLegs = fillShipmentLegsForLoad(loadTM.ShipmentLeg);
  var containerInfoTM = fillContainerInfo(loadTM);

  load.shipmentLegs = shipmentLegs;
  load.loadDimInfo = containerInfoTM;

  return load;
}
function writeToBlockChain(asset, restUrl,postFn) {
  console.log("starting : "+restUrl);
  asset = JSON.stringify(asset);
  var http = require('http');
  var postheaders = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(asset, 'utf8')
  };
  var optionspost = {
    host: '35.200.243.178',
    port: 3000,
    path: restUrl,
    method: 'POST',
    headers: postheaders
  };

  var reqPost = http.request(optionspost, function (res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function (d) {
      console.log('POST result:\n');
      process.stdout.write(d);
      console.info('\n\npost call completed for: '+restUrl);

      if(postFn != null && postFn != undefined) {
        postFn();
      }
    });
  });

  reqPost.write(asset);
  reqPost.end();
  reqPost.on('error', function (e) {
    console.error(e);
  });
}

function fillOnShipmentCreation(shipmentLegAsset, shipTm) {
  shipmentLegAsset.pickupArrivalDateTime = shipTm.PickupArrivalDateTime;
  shipmentLegAsset.pickupDepartureDateTime = shipTm.PickupDepartureDateTime;
  shipmentLegAsset.dropArrivalDateTime = shipTm.DropArrivalDateTime;
  shipmentLegAsset.dropDepartureDateTime = shipTm.DropDepartureDateTime;
}

function fillOnLoadAccept(shipmentLegAsset, shipmentLegTm) {
  shipmentLegAsset.computedArrivalDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickArrival;
  shipmentLegAsset.computedDepartureDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickDeparture;
  shipmentLegAsset.computedArrivalDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropArrival;
  shipmentLegAsset.computedDepartureDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropDeparture;

}

//?-todo
function fillActualTime(shipmentLegAsset, shipmentLegTm) {
  shipmentLegAsset.actualArrivalDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickArrival;
  shipmentLegAsset.actualDepartureDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickDeparture;
  shipmentLegAsset.actualArrivalDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropArrival;
  shipmentLegAsset.actualDepartureDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropDeparture;


}
function fillShipment(shipTM) {

  //  console.log(shipment.ShipmentNumber);

  var shipment = new Shipment();
  shipment.$class = 'com.jda.shipment.visibility.Shipment';
  shipment.shipmentId = shipTM.SystemShipmentID;
  shipment.shipmentStatus = 'DSTS_SHPM_D_PROCESSING';//data.CISDocument.EventName;
  // shipment.freightTerms = 'FT_COLLECT';//data.CISDocument.FreightTerm;
  shipment.pickupFromDateTime = shipTM.PickupFromDateTime;
  shipment.pickupToDateTime = shipTM.PickupToDateTime;
  shipment.deliveryFromDateTime = shipTM.DeliveryFromDateTime;
  shipment.deliveryToDateTime = shipTM.DeliveryToDateTime;
  shipment.commodityCode = shipTM.CommodityCode;
  shipment.unitOfMeasure = shipTM.unitOfMeasure;//Model needs to be changed
  shipment.pickupArrivalDateTime = shipTM.PickupFromDateTime;
  shipment.pickupDepartureDateTime = shipTM.PickupToDateTime;
  shipment.dropArrivalDateTime = shipTM.DeliveryFromDateTime;
  shipment.dropDepartureDateTime = shipTM.DeliveryToDateTime;

  var shipFromLocation = new Location();
  shipFromLocation.$class = 'com.jda.shipment.visibility.Location';
  shipFromLocation.locationCode = shipTM.ShipFromLocationCode;
  // console.log(shipTM.ShipFromAddress);
  fillAddress(shipFromLocation, shipTM.ShipFromAddress);
  shipment.shipFromLocation = shipFromLocation;

  //console.log(shipFromLocation);

  var shipToLocation = new Location();
  shipToLocation.$class = 'com.jda.shipment.visibility.Location';
  shipToLocation.locationCode = shipTM.ShipToLocationCode;
  fillAddress(shipToLocation, shipTM.ShipToAddress);
  shipment.shipToLocation = shipToLocation;

  var shipmentLegs = fillShipmentLegs(shipTM.ShipmentLeg, shipTM);
  shipment.shipmentLegs = shipmentLegs;


  return shipment;

}

function fillAddress(location, shipFromAddress) {
  location.city = shipFromAddress.City;
  location.country = shipFromAddress.CountryCode;
  //  shipFromLocation.locality = shipTM.OriginShippingLocationName;
  //shipFromLocation.region = data.CISDocument.OriginAddress. //not available
  //  location.street = shipFromAddress.Street;
  //shipFromLocation.street2 = shipTM.OriginAddress.OriginBlock;
  // shipFromLocation.street3 = data.CISDocument.OriginAddress. //not available
  location.stateCode = shipFromAddress.State;//Added newly
  location.postalCode = shipFromAddress.PostalCode;
  location.latitude = shipFromAddress.Latitude;
  location.longitude = shipFromAddress.Longitude;

}


function fillShipmentLegsForLoad(shipmentLegs) {
  var shipmentLegAssets = [];
  for (i = 0; i < shipmentLegs.length; i++) {
    var shipmentLegTm = shipmentLegs[i];
    var shipmentLegAsset = new ShipmentLeg();
    shipmentLegAsset.$class = "com.jda.shipment.visibility.ShipmentLegs";
    shipmentLegAsset.shipmentLegId = shipmentLegTm.Id;
    shipmentLegAsset.shipmentId = shipmentLegTm.SystemShipmentID;
    shipmentLegAsset.shipmentSequenceNumber = shipmentLegTm.ShipmentSequenceNumber;
    shipmentLegAsset.shipmentLegStatus = shipmentLegTm.DisplayStatusEnumVal;
    //shipmentLegAsset.carrierCode =

    var shipLegFromLocation = new Location();
    shipLegFromLocation.$class = 'com.jda.shipment.visibility.Location';
    shipLegFromLocation.locationCode = shipmentLegTm.ShipFromLocationCode;
    fillAddress(shipLegFromLocation, shipmentLegTm.ShipFromAddress);

    shipmentLegAsset.shipFromLocation = shipLegFromLocation;

    var shipLegToLocation = new Location();
    shipLegToLocation.$class = 'com.jda.shipment.visibility.Location';
    shipLegToLocation.locationCode = shipmentLegTm.ShipFromLocationCode;
    fillAddress(shipLegToLocation, shipmentLegTm.ShipToAddress);

    shipmentLegAsset.shipToLocation = shipLegToLocation;

    fillOnLoadAccept(shipmentLegAsset, shipmentLegTm);

    shipmentLegAssets[i] = shipmentLegAsset;
  }
  return shipmentLegAssets;
}
function fillShipmentLegs(shipmentLegs, shipTm) {
  var shipmentLegAssetArr = [];
  for (i = 0; i < shipmentLegs.length; i++) {
    var shipmentLegTm = shipmentLegs[i];
    var shipmentLegAsset = new ShipmentLeg();
    shipmentLegAsset.$class = "com.jda.shipment.visibility.ShipmentLegs";
    shipmentLegAsset.shipmentLegId = shipmentLegTm.Id;
    shipmentLegAsset.shipmentSequenceNumber = shipmentLegTm.ShipmentSequenceNumber;
    shipmentLegAsset.shipmentLegStatus = shipmentLegTm.DisplayStatusEnumVal;
    //shipmentLegAsset.carrierCode =

    var shipLegFromLocation = new Location();
    shipLegFromLocation.$class = 'com.jda.shipment.visibility.Location';
    shipLegFromLocation.locationCode = shipmentLegTm.ShipFromLocationCode;
    fillAddress(shipLegFromLocation, shipmentLegTm.ShipFromAddress);

    shipmentLegAsset.shipFromLocation = shipLegFromLocation;

    var shipLegToLocation = new Location();
    shipLegToLocation.$class = 'com.jda.shipment.visibility.Location';
    shipLegToLocation.locationCode = shipmentLegTm.ShipFromLocationCode;
    fillAddress(shipLegToLocation, shipmentLegTm.ShipToAddress);

    shipmentLegAsset.shipToLocation = shipLegToLocation;

    fillOnShipmentCreation(shipmentLegAsset, shipTm);


    shipmentLegAssetArr[i] = shipmentLegAsset;

  }
  return shipmentLegAssetArr;
}

function fillContainerInfo(loadTM) {
  var containerInfoTM = new ShipmentContainerInfo();
  containerInfoTM.$class = 'com.jda.shipment.visibility.ShipmentContainerInfo';
  containerInfoTM.scaledWeight = loadTM.TotalScaledWeight;
  containerInfoTM.volume = loadTM.TotalVolume;
  //containerInfoTM.orderValue = loadTM.TotalVrderValue;
  containerInfoTM.declaredValue = loadTM.TotalDeclaredValue;
  containerInfoTM.tareWeight = loadTM.TotalTareWeight;
  containerInfoTM.pieces = loadTM.TotalPieces;
  containerInfoTM.skids = loadTM.TotalSkids;
  containerInfoTM.volume = loadTM.TotalVolume;

  containerInfoTM.flexibleQuantity1 = loadTM.TotalFlexibleQuantity1;
  containerInfoTM.flexibleQuantity2 = loadTM.TotalFlexibleQuantity2;
  containerInfoTM.flexibleQuantity3 = loadTM.TotalFlexibleQuantity3;
  containerInfoTM.flexibleQuantity4 = loadTM.TotalFlexibleQuantity4;
  return containerInfoTM;
}
function prepareShipmentArray(loadAsset, assocateLoadTx) {

  var shipmentLegs = loadAsset.shipmentLegs;

  var shipmentArr = getUniqueShipments(shipmentLegs);
  for (shipmentIdVal in shipmentArr) {
    var shipRef = "resource:com.jda.shipment.visibility.Shipment#"+shipmentArr[shipmentIdVal];
    assocateLoadTx.shipmentArr.push(shipRef);
  }

  function getUniqueShipments(shipmentLegs){
    var shipmentArr = [];
    for (i = 0; i < shipmentLegs.length; i++) {
      var shipmentLeg = shipmentLegs[i];
      var shipmentId = shipmentLeg.shipmentId;
      if (shipmentArr.indexOf(shipmentId) == -1 ) {
        shipmentArr.push(shipmentId);
      }
    }

    return shipmentArr;
  }

}
function createAssociateLoadTransaction(loadAsset) {

  var assocateLoadTx = new AssociateLoadAndShipmentLegs();
  assocateLoadTx.$class="com.jda.shipment.visibility.AssociateLoadAndShipmentLegs";
  assocateLoadTx.load='"resource:com.jda.shipment.visibility.Load#'+loadAsset.loadId;

  prepareShipmentArray(loadAsset,assocateLoadTx);

  // console.log(assocateLoadTx);
  return assocateLoadTx;
}
function invokeSOAPCall(args, fn) {
  soap.createClient(url, function (err, client) {
    client.setSecurity(new soap.BasicAuthSecurity('VENTURE', 'VENTURE'));

    client.getEntity(args, function (err, result) {

      fn(result);

    });
  });
}


var Location = new SchemaObject({
  $class: "com.jda.shipment.visibility.Location",
  locationCode: String,
  city: String,
  country: String,
  locality: String,
  region: String,
  street: String,
  street2: String,
  street3: String,
  postalCode: String,
  stateCode: String,
  postOfficeBoxNumber: String,
  latitude: String,
  longitude: String,
});
var Shipment = new SchemaObject({
  $class: "com.jda.shipment.visibility.Shipment",
  shipmentId: String,
  shipmentStatus: String,
  shipmentLegs: [],
  freightTerms: String,
  pickupFromDateTime: String,
  pickupToDateTime: String,
  deliveryFromDateTime: String,
  deliveryToDateTime: String,
  commodityCode: String,
  unitOfMeasure: String,
  pickupArrivalDateTime: String,
  pickupDepartureDateTime: String,
  dropArrivalDateTime: String,
  dropDepartureDateTime: String,
  load: String,
  shipFromLocation: Location,
  shipToLocation: Location


});

var ShipmentLeg = new SchemaObject(
  {
    $class: "com.jda.shipment.visibility.ShipmentLegs",
    shipmentLegId: Number,
    shipmentId: Number,
    shipmentSequenceNumber: String,
    shipFromLocation: Location,
    shipToLocation: Location,
    shipmentLegStatus: String,

    carrierCode: String,

    pickupArrivalDateTime: String, //ComputedDateTimeOfPickArrival
    pickupDepartureDateTime: String, //ComputedDateTimeOfPickDeparture
    dropArrivalDateTime: String, //ComputedDateTimeOfDropArrival
    dropDepartureDateTime: String, //ComputedDateTimeOfDropDeparture

    computedArrivalDateTimeFromLocation: String,
    computedDepartureDateTimeFromLocation: String,
    computedArrivalDateTimeToLocation: String,
    computedDepartureDateTimeToLocation: String,

    actualArrivalDateTimeFromLocation: String,
    actualDepartureDateTimeFromLocation: String,
    actualArrivalDateTimeToLocation: String,
    actualDepartureDateTimeToLocation: String
    //load:Load
  });
var ShipmentContainerInfo = new SchemaObject(
  {
    $class: "com.jda.shipment.visibility.ShipmentContainerInfo",
    scaledWeight: Number,
    volume: Number,
    orderValue: Number,
    declaredValue: Number,
    nominalWeight: Number,
    tareWeight: Number,
    pieces: Number,
    skids: Number,
    ladenLength: Number,
    flexibleQuantity1: Number,
    flexibleQuantity2: Number,
    flexibleQuantity3: Number,
    flexibleQuantity4: Number,
    flexibleQuantity5: Number
  }
);

var Load = new SchemaObject(
  {
    $class: "com.jda.shipment.visibility.Load",
    loadId: String,
    carrierCode: String,
    shipFromLocation: Location,
    shipToLocation: Location,
    shipmentLegs: [ShipmentLeg],
    loadStatus: String,
    loadDimInfo: ShipmentContainerInfo,

  });

//transaction classes
var AssociateLoadAndShipmentLegs = new SchemaObject({
  $class: "com.jda.shipment.visibility.AssociateLoadAndShipmentLegs",
  shipmentArr:[String],
  load: String //"load": "resource:com.jda.shipment.visibility.Load#4185"
});

var UpdateShipmentPickupDelivery = new SchemaObject({
  $class: "com.jda.shipment.visibility.UpdateShipmentPickupDelivery",
  shipment: String, //"shipment": "resource:com.jda.shipment.visibility.Shipment#1677",
  load: String, //"resource:com.jda.shipment.visibility.Load#3843",
  newLoadStatus: String,
  newShipmentStatus: String,
  shipmentLegId: Number,
  newShipmentLegStatus: String,
  pickupArrivalDateTime:String,
  pickupDepartureDateTime:String,
  dropArrivalDateTime:String,
  dropDepartureDateTime:String
});











