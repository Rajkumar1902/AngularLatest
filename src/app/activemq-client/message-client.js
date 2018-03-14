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
function handleLoadRelatedEvent(data, eventName,loadTM) {
  var legs = data.CISDocument.ShipmentLeg;
  var loadStatus = data.CISDocument.SystemLoadStatus;//data.CISDocument.SystemLoadStatus;"LL_DINTRANS"

  if (legs[0] == undefined) {
      var singleLeg = data.CISDocument.ShipmentLeg;
      onLoadStopEvents(singleLeg, loadStatus, eventName,loadTM);

    } else {
        var shiplegArr = [];
        for (i = 0; i < 10; i++) {
          if (legs[i] == undefined) break;
          shiplegArr.push(legs[i]);
        }
        callInLoop(shiplegArr);
        function callInLoop(legsToRetrieve) {
          var currentLeg = legsToRetrieve.shift();
          var remainingArr = legsToRetrieve;

          var loopfn = function(){
            callInLoop(remainingArr);
          };

          if (currentLeg != null && currentLeg != undefined)  onLoadStopEvents(currentLeg, loadStatus, eventName, loadTM,loopfn);

            }

        }
}
function handleEvent(eventName, data) {

  if (eventName == 'ShipmentProcessed') {

    var shipmentId = data.CISDocument.SystemShipmentID;
    console.log("Shipment Processing for ID: "+shipmentId);

    onShipmentProcessedEvent(shipmentId);

  } else if (eventName == 'LoadTenderAccepted') {
    var loadId = data.CISDocument.SystemLoadID;
    console.log("Load tender accept begin for ID: "+loadId);
    onLoadTenderAcceptedEvent(loadId);
  }
  else if (eventName == 'LoadStopConfirmed' || eventName == 'LoadStopDelivered' || eventName == 'LoadStopETARevision') {  //?

    var loadId = data.CISDocument.SystemLoadID;
    var args = {EntityType: "LoadType", Id: loadId, Select: {Collection: [{Name: "ShipmentLeg"},{Name: "Stop"}]}};

    var callbackAfterQuery = function (result) {
      var loadTM = result.Entity.Load[0];
      console.log("load from TM: "+JSON.stringify(loadTM))
      handleLoadRelatedEvent(data, eventName,loadTM);

    };
    invokeSOAPCall(args, callbackAfterQuery);


  }
  /*else if(eventName == 'ShipmentDelivered'){

  }*/

}

function createUpdateShipmentTrx(legTm, newLoadStatus,newShipStatus,eventName,loadTM) {

  var updateShipmentTx = new UpdateShipmentPickupDelivery();
  updateShipmentTx.$class = "com.jda.shipment.visibility.UpdateShipmentPickupDelivery";
  updateShipmentTx.shipment = "resource:com.jda.shipment.visibility.Shipment#"+legTm.SystemShipmentID;
  updateShipmentTx.load = "resource:com.jda.shipment.visibility.Load#"+legTm.SystemLoadID;


  updateShipmentTx.newLoadStatus = newLoadStatus;

  updateShipmentTx.newShipmentStatus = newShipStatus;
  updateShipmentTx.shipmentLegId = legTm.Id;
  updateShipmentTx.newShipmentLegStatus = legTm.DisplayStatusEnumVal;

  var stop1 = loadTM.Stop[0];
  var stop2 = loadTM.Stop[1];
  if (stop1.LastComputedArrivalDateTime != null)
    updateShipmentTx.pickupArrivalDateTime = stop1.LastComputedArrivalDateTime.toString();
  if (stop1.LastComputedArrivalDateTime != null)
    updateShipmentTx.pickupDepartureDateTime = stop1.LastComputedDepartureDateTime.toString();

  if (stop1.LastComputedArrivalDateTime != null)
    updateShipmentTx.dropArrivalDateTime = stop2.LastComputedArrivalDateTime.toString();
  if (stop1.LastComputedArrivalDateTime != null)
    updateShipmentTx.dropDepartureDateTime = stop2.LastComputedDepartureDateTime.toString();

  /*if(eventName == 'LoadStopConfirmed') {
    if (legTm.PickupArrivalDateTime != null)
      updateShipmentTx.pickupArrivalDateTime = legTm.PickupArrivalDateTime.toString();
    if (legTm.PickupDepartureDateTime != null)
      updateShipmentTx.pickupDepartureDateTime = legTm.PickupDepartureDateTime.toString();
  }
  else {
    if (legTm.DropArrivalDateTime != null)
      updateShipmentTx.dropArrivalDateTime = legTm.DropArrivalDateTime.toString();
    if (legTm.DropDepartureDateTime != null)
      updateShipmentTx.dropDepartureDateTime = legTm.DropDepartureDateTime.toString();
  }*/
  return updateShipmentTx;
}
function handleEachShipLeg(legTm,loadStatus,eventName,loadTM,loopFn) {
  var shipArgs = {EntityType: "ShipmentType", Id: legTm.SystemShipmentID};

  var shipCallback = function (result) {
      var shipTM = result.Entity.Shipment[0];
      var newShipmentStatus = shipTM.DisplayStatusEnumVal;
      var updateShipmentTx = createUpdateShipmentTrx(legTm,loadStatus,newShipmentStatus,eventName,loadTM);

     writeToBlockChain(updateShipmentTx,'/api/UpdateShipmentPickupDelivery',loopFn);
    };
  invokeSOAPCall(shipArgs, shipCallback);
}
function queryTMShipmentLegs(loadTM) {
  var shipLegDBResults = [];
  shipLegRecursiveQuery(loadTM.ShipmentLeg,shipLegDBResults);

  function shipLegRecursiveQuery(legsToRetrieve){
    var currentLeg = legsToRetrieve.shift();
    var remainingArr = legsToRetrieve;

    var shipLegQueryCallback = function (result) {
      var legTm = result.Entity.ShipmentLeg[0];

      shipLegDBResults.push(legTm);

      if(remainingArr.length > 0) {
        shipLegRecursiveQuery(remainingArr,shipLegDBResults)
      }else { //after all shipment legs queried, proceed to create load asset and transaction.
        var loadAsset = fillLoad(loadTM,shipLegDBResults);

        var associateLoadTx = createAssociateLoadTransaction(loadAsset);

        var trxFn = function (result) {
          writeToBlockChain(associateLoadTx,'/api/AssociateLoadAndShipmentLegs');
        };
        writeToBlockChain(loadAsset,'/api/Load',trxFn); //create load asset in blockchain

      }
    };

    var legArgs = {EntityType: "ShipmentLegType", Id: currentLeg.SystemShipmentLegID}; //'100176875'

    invokeSOAPCall(legArgs, shipLegQueryCallback);
  }

}
function onLoadTenderAcceptedEvent(loadId) {
  //var args = {EntityType: "LoadType", Id: "76569", Select: {Collection: [{Name: "ShipmentLeg"}]}};

  var args = {EntityType: "LoadType", Id: loadId, Select: {Collection: [{Name: "ShipmentLeg"}]}};

  var callbackLoad = function (result) {
      var loadTM = result.Entity.Load[0];

      queryTMShipmentLegs(loadTM);

    };
  invokeSOAPCall(args, callbackLoad);
}
function onShipmentProcessedEvent(shipmentId) {
  var args = {EntityType: "ShipmentType",Id: shipmentId,Select: {Collection: [{Name: "ShipmentLeg"}, {Name: "Container"}]}};
  //var args = {EntityType: "ShipmentType",Id: "161715"};


  var callback = function (result) {
      var shipTM = result.Entity.Shipment[0];
      var shipmentAsset = fillShipment(shipTM);

      writeToBlockChain(shipmentAsset,'/api/Shipment');

    };
  invokeSOAPCall(args, callback);
}
function onLoadStopEvents(leg, loadStatus, eventName, loadTM, loopFn) {
  var legArgs = {EntityType: "ShipmentLegType", Id: leg.SystemShipmentLegID};
  var shipLegCallback = function (result) {
      var legTm = result.Entity.ShipmentLeg[0];
      handleEachShipLeg(legTm,loadStatus,eventName,loadTM, loopFn);
    };
  invokeSOAPCall(legArgs, shipLegCallback);

}

function fillLoad(loadTM, shipLegDBResults) {
  var load = new Load();
  load.loadId = loadTM.Id;
  load.carrierCode = loadTM.CarrierCode;
  load.vesselName = loadTM.Vessel;
  load.voyageNumber = loadTM.VoyageNumber;

  var shipmentLegAssets = fillShipmentLegsForLoad(shipLegDBResults);
  var containerInfoTM = fillContainerInfo(loadTM);

  load.shipmentLegs = shipmentLegAssets;
  load.loadDimInfo = containerInfoTM;

  return load;
}
function writeToBlockChain(asset, restUrl,postFn) {
  console.log("starting writing to blockchain : "+restUrl);
  asset = JSON.stringify(asset);
  var http = require('http');
  var postheaders = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(asset, 'utf8')
  };
  var optionspost = {
    host: '35.200.243.178', //blockchain composer-rest-server url
    port: 3000,
    path: restUrl,
    method: 'POST',
    headers: postheaders
  };

  var reqPost = http.request(optionspost, function (res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function (d) {
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

function fillOnShipmentCreation(shipmentLegAsset, shipmentLegTm) {
  if(shipmentLegTm.PickupArrivalDateTime != undefined && shipmentLegTm.PickupArrivalDateTime != null) shipmentLegAsset.pickupArrivalDateTime = shipmentLegTm.PickupArrivalDateTime.toString();
  if(shipmentLegTm.PickupDepartureDateTime != undefined && shipmentLegTm.PickupDepartureDateTime != null) shipmentLegAsset.pickupDepartureDateTime = shipmentLegTm.PickupDepartureDateTime.toString();
  if(shipmentLegTm.DropArrivalDateTime != undefined && shipmentLegTm.DropArrivalDateTime != null) shipmentLegAsset.dropArrivalDateTime = shipmentLegTm.DropArrivalDateTime.toString();
  if(shipmentLegTm.DropDepartureDateTime != undefined && shipmentLegTm.DropDepartureDateTime != null) shipmentLegAsset.dropDepartureDateTime = shipmentLegTm.DropDepartureDateTime.toString();
}

function fillTimesOnLoadAccept(shipmentLegAsset, shipmentLegTm) {
  shipmentLegAsset.computedArrivalDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickArrival.toString();
  shipmentLegAsset.computedDepartureDateTimeFromLocation = shipmentLegTm.ComputedDateTimeOfPickDeparture.toString();
  shipmentLegAsset.computedArrivalDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropArrival.toString();
  shipmentLegAsset.computedDepartureDateTimeToLocation = shipmentLegTm.ComputedDateTimeOfDropDeparture.toString();
}

function fillShipment(shipTM) {

  var shipment = new Shipment();
  shipment.$class = 'com.jda.shipment.visibility.Shipment';
  shipment.shipmentId = shipTM.SystemShipmentID;
  shipment.shipmentUserId  =shipTM.ShipmentNumber;
  shipment.shipmentStatus = 'DSTS_SHPM_D_PROCESSING';//data.CISDocument.EventName;
  // shipment.freightTerms = 'FT_COLLECT';//data.CISDocument.FreightTerm;
  shipment.pickupFromDateTime = shipTM.PickupFromDateTime.toString();
  shipment.pickupToDateTime = shipTM.PickupToDateTime.toString();
  shipment.deliveryFromDateTime = shipTM.DeliveryFromDateTime.toString();
  shipment.deliveryToDateTime = shipTM.DeliveryToDateTime.toString();
  shipment.commodityCode = shipTM.CommodityCode;
  shipment.unitOfMeasure = shipTM.unitOfMeasure;//Model needs to be changed
  shipment.pickupArrivalDateTime = shipTM.PickupFromDateTime.toString();
  shipment.pickupDepartureDateTime = shipTM.PickupToDateTime.toString();
  shipment.dropArrivalDateTime = shipTM.DeliveryFromDateTime.toString();
  shipment.dropDepartureDateTime = shipTM.DeliveryToDateTime.toString();
  shipment.customerCode = shipTM.CustomerCode;

  var shipFromLocation = new Location();
  shipFromLocation.$class = 'com.jda.shipment.visibility.Location';
  shipFromLocation.locationCode = shipTM.ShipFromLocationCode;
  //shipFromLocation.locationName= shipTM.
  fillAddress(shipFromLocation, shipTM.ShipFromAddress);
  shipment.shipFromLocation = shipFromLocation;


  var shipToLocation = new Location();
  shipToLocation.$class = 'com.jda.shipment.visibility.Location';
  shipToLocation.locationCode = shipTM.ShipToLocationCode;
  fillAddress(shipToLocation, shipTM.ShipToAddress);
  shipment.shipToLocation = shipToLocation;

  var shipmentLegs = fillShipmentLegs(shipTM.ShipmentLeg, shipTM);
  shipment.shipmentLegs = shipmentLegs;


  return shipment;

}

function fillAddress(location, addressTm) {
  location.city = addressTm.City;
  location.country = addressTm.CountryCode;
  //  shipFromLocation.locality = shipTM.OriginShippingLocationName;
  //shipFromLocation.region = data.CISDocument.OriginAddress. //not available
  //  location.street = shipFromAddress.Street;
  //shipFromLocation.street2 = shipTM.OriginAddress.OriginBlock;
  // shipFromLocation.street3 = data.CISDocument.OriginAddress. //not available
  location.stateCode = addressTm.State;//Added newly
  location.postalCode = addressTm.PostalCode;
  location.latitude = addressTm.Latitude;
  location.longitude = addressTm.Longitude;
  location.locationName=addressTm.ShippingLocationDescription;

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

    fillTimesOnLoadAccept(shipmentLegAsset, shipmentLegTm);

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

    fillOnShipmentCreation(shipmentLegAsset, shipmentLegTm);


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
  locationName: String,
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
  shipmentUserId: String,
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
  customerCode: String,
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
    vesselName:String,
    voyageNumber:String

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











