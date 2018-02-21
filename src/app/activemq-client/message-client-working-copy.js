var SERVER_ADDRESS = 'c71dq72j.jda.corp.local';
var SERVER_PORT = 61613;
var QUEUE = '/queue/Shipment';


var StompClient = require('stomp-client');
var stompClient = new StompClient(SERVER_ADDRESS, SERVER_PORT, '', '', '1.0');

// stompClient.connect(function() {
//     stompClient.subscribe(QUEUE, function(data, headers){
//         console.log(data);
//     });
// });

var to_json = require('xmljson').to_json;
var SchemaObject = require('node-schema-object');

var xml = '<CISDocument><EventName>ShipmentProcessed</EventName><ReasonCode>PRSD</ReasonCode></CISDocument>';

to_json(xml, function (error, data) {

  var Shipment = new SchemaObject({
      event: String,
      reason: String
  });

  var shipment = new Shipment();
  shipment.event = data.CISDocument.EventName;
  shipment.reason = data.CISDocument.ReasonCode;
 // console.log('JSON--------------------->'+JSON.stringify(shipment));

});


//Get Request
var options = {
  host: '35.200.212.213',
  port: 3000,
  path: '/api/Shipment',
  method: 'GET'
};

var http = require('http');
http.request(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));

 // res.setEncoding('utf8');
  res.on('data', function (chunk) {
    //console.log('BODY: ' + chunk);
  });
}).end();


// Post request

var shipment = '{\n' +
  '  "$class": "com.jda.shipment.visibility.Shipment",\n' +
  '  "shipmentId": "44",\n' +
  '  "shipmentStatus": "DSTS_NULL",\n' +
  '  "freightTerms": "FT_PRE_PAID",\n' +
  '  "shipFromLocation": {\n' +
  '    "$class": "com.jda.shipment.visibility.Location",\n' +
  '    "locationCode": "string",\n' +
  '    "city": "string",\n' +
  '    "country": "string",\n' +
  '    "locality": "string",\n' +
  '    "region": "string",\n' +
  '    "street": "string",\n' +
  '    "street2": "string",\n' +
  '    "street3": "string",\n' +
  '    "postalCode": "string",\n' +
  '    "postOfficeBoxNumber": "string",\n' +
  '    "latitude": 0,\n' +
  '    "longitude": 0,\n' +
  '    "id": "string"\n' +
  '  },\n' +
  '  "shipToLocation": {\n' +
  '    "$class": "com.jda.shipment.visibility.Location",\n' +
  '    "locationCode": "string",\n' +
  '    "city": "string",\n' +
  '    "country": "string",\n' +
  '    "locality": "string",\n' +
  '    "region": "string",\n' +
  '    "street": "string",\n' +
  '    "street2": "string",\n' +
  '    "street3": "string",\n' +
  '    "postalCode": "string",\n' +
  '    "postOfficeBoxNumber": "string",\n' +
  '    "latitude": 0,\n' +
  '    "longitude": 0,\n' +
  '    "id": "string"\n' +
  '  },\n' +
  '  "pickupFromDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '  "pickupToDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '  "deliveryFromDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '  "deliveryToDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '  "commodityCode": "string",\n' +
  '  "unitOfMeasure": "UMS_NULL",\n' +
  '  "shipmentContainerInfo": {\n' +
  '    "$class": "com.jda.shipment.visibility.ShipmentContainerInfo",\n' +
  '    "scaledWeight": 0,\n' +
  '    "volume": 0,\n' +
  '    "orderValue": 0,\n' +
  '    "declaredValue": 0,\n' +
  '    "nominalWeight": 0,\n' +
  '    "tareWeight": 0,\n' +
  '    "pieces": 0,\n' +
  '    "skids": 0,\n' +
  '    "ladenLength": 0,\n' +
  '    "flexibleQuantity1": 0,\n' +
  '    "flexibleQuantity2": 0,\n' +
  '    "flexibleQuantity3": 0,\n' +
  '    "flexibleQuantity4": 0,\n' +
  '    "flexibleQuantity5": 0,\n' +
  '    "id": "string"\n' +
  '  },\n' +
  '  "shipmentDetails": [\n' +
  '    {\n' +
  '      "$class": "com.jda.shipment.visibility.ShipmentDetails",\n' +
  '      "shipmentDetailsId": "string",\n' +
  '      "itemNumber": 0,\n' +
  '      "itemPackageLevelIDCode": "string",\n' +
  '      "itemGroupCode": "string",\n' +
  '      "itemType": "string",\n' +
  '      "originCountryCode": "string",\n' +
  '      "quantity": 0,\n' +
  '      "numberOfUnits": 0,\n' +
  '      "length": 0,\n' +
  '      "width": 0,\n' +
  '      "height": 0,\n' +
  '      "shipmentContainerInfo": {\n' +
  '        "$class": "com.jda.shipment.visibility.ShipmentContainerInfo",\n' +
  '        "scaledWeight": 0,\n' +
  '        "volume": 0,\n' +
  '        "orderValue": 0,\n' +
  '        "declaredValue": 0,\n' +
  '        "nominalWeight": 0,\n' +
  '        "tareWeight": 0,\n' +
  '        "pieces": 0,\n' +
  '        "skids": 0,\n' +
  '        "ladenLength": 0,\n' +
  '        "flexibleQuantity1": 0,\n' +
  '        "flexibleQuantity2": 0,\n' +
  '        "flexibleQuantity3": 0,\n' +
  '        "flexibleQuantity4": 0,\n' +
  '        "flexibleQuantity5": 0,\n' +
  '        "id": "string"\n' +
  '      },\n' +
  '      "id": "string"\n' +
  '    }\n' +
  '  ],\n' +
  '  "loggingInfo": {\n' +
  '    "$class": "com.jda.shipment.visibility.LoggingInfo",\n' +
  '    "createdByUser": "string",\n' +
  '    "createdDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '    "updatedByUser": "string",\n' +
  '    "updatedDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '    "id": "string"\n' +
  '  },\n' +
  '  "shipmentLegs": [\n' +
  '    {\n' +
  '      "$class": "com.jda.shipment.visibility.ShipmentLegs",\n' +
  '      "shipmentLegId": "string",\n' +
  '      "shipmentSequenceNumber": 0,\n' +
  '      "shipFromLocation": {\n' +
  '        "$class": "com.jda.shipment.visibility.Location",\n' +
  '        "locationCode": "string",\n' +
  '        "city": "string",\n' +
  '        "country": "string",\n' +
  '        "locality": "string",\n' +
  '        "region": "string",\n' +
  '        "street": "string",\n' +
  '        "street2": "string",\n' +
  '        "street3": "string",\n' +
  '        "postalCode": "string",\n' +
  '        "postOfficeBoxNumber": "string",\n' +
  '        "latitude": 0,\n' +
  '        "longitude": 0,\n' +
  '        "id": "string"\n' +
  '      },\n' +
  '      "shipToLocation": {\n' +
  '        "$class": "com.jda.shipment.visibility.Location",\n' +
  '        "locationCode": "string",\n' +
  '        "city": "string",\n' +
  '        "country": "string",\n' +
  '        "locality": "string",\n' +
  '        "region": "string",\n' +
  '        "street": "string",\n' +
  '        "street2": "string",\n' +
  '        "street3": "string",\n' +
  '        "postalCode": "string",\n' +
  '        "postOfficeBoxNumber": "string",\n' +
  '        "latitude": 0,\n' +
  '        "longitude": 0,\n' +
  '        "id": "string"\n' +
  '      },\n' +
  '      "pickupArrivalDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '      "pickupDepartureDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '      "dropArrivalDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '      "dropDepartureDateTime": "2018-02-20T04:30:28.763Z",\n' +
  '      "shipmentLegStatus": "DSTS_NULL",\n' +
  '    \n' +
  '      "id": "string"\n' +
  '    }\n' +
  '  ]\n' +
  '}\n';

// prepare the header
var postheaders = {
  'Content-Type' : 'application/json',
  'Content-Length' : Buffer.byteLength(shipment, 'utf8')
};

// the post options
var optionspost = {
  host : '35.200.212.213',
  port : 3000,
  path : '/api/Shipment',
  method : 'POST',
  headers : postheaders
};

var reqPost = http.request(optionspost, function(res) {
  console.log("statusCode: ", res.statusCode);
  // uncomment it for header details
//  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    console.info('POST result:\n');
    process.stdout.write(d);
    console.info('\n\nPOST completed');
  });
});

// write the json data
reqPost.write(shipment);
reqPost.end();
reqPost.on('error', function(e) {
  console.error(e);
});
