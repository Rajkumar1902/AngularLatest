/*var xml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\n' +
  '<CISDocument>\n' +
  '\n' +
  '  <EventName>ShipmentProcessed</EventName>\n' +
  '\n' +
  '  <ReasonCode>PRSD</ReasonCode>\n' +
  '\n' +
  '  <ReasonCodeDescription>Processed</ReasonCodeDescription>\n' +
  '\n' +
  '  <SystemTimeZoneOffset>0.000000</SystemTimeZoneOffset>\n' +
  '\n' +
  '  <EventDateTime>2018-02-12T18:15:47</EventDateTime>\n' +
  '\n' +
  '  <EventReportedDateTime>2018-02-12T18:15:47</EventReportedDateTime>\n' +
  '\n' +
  '  <EventOccurredDateTime>2018-02-12T18:15:47</EventOccurredDateTime>\n' +
  '\n' +
  '  <EventOccurredTimeZoneOffset>0.000000</EventOccurredTimeZoneOffset>\n' +
  '\n' +
  '  <EventUser>WR</EventUser>\n' +
  '\n' +
  '  <SystemShipmentID>158736</SystemShipmentID>\n' +
  '\n' +
  '  <SystemShipmentNumber>TEST1235</SystemShipmentNumber>\n' +
  '\n' +
  '  <DivisionCode>WR</DivisionCode>\n' +
  '\n' +
  '  <LogisticsGroup>WR</LogisticsGroup>\n' +
  '\n' +
  '  <OriginCode>TORONTO</OriginCode>\n' +
  '\n' +
  '  <OriginTypeEnumVal>LA</OriginTypeEnumVal>\n' +
  '\n' +
  '  <OriginName>TORONTO</OriginName>\n' +
  '\n' +
  '  <OriginAddress>\n' +
  '    <OriginBlock>255</OriginBlock>\n' +
  '    <OriginStreet>MAIN ST</OriginStreet>\n' +
  '    <OriginCity>TORONTO</OriginCity>\n' +
  '    <OriginPostalCode>M4C4X2</OriginPostalCode>\n' +
  '    <OriginStateCode>ON</OriginStateCode>\n' +
  '    <OriginCountryCode>CAN</OriginCountryCode>\n' +
  '    <OriginTimeZoneOffset>0.000000</OriginTimeZoneOffset>\n' +
  '  </OriginAddress><OriginShippingLocation>\n' +
  '    <OriginShippingLocationName>TORONTO</OriginShippingLocationName>\n' +
  '    <OriginShippingLocationContact>\n' +
  '      <OriginShippingLocationContactPrimaryTelephoneNumber>(123) 123-1233 [    ]</OriginShippingLocationContactPrimaryTelephoneNumber>\n' +
  '    </OriginShippingLocationContact>\n' +
  '    <OriginShippingLocationTimeZoneOffset>0.000000</OriginShippingLocationTimeZoneOffset>\n' +
  '  </OriginShippingLocation><DestinationCode>DETROIT</DestinationCode>\n' +
  '\n' +
  '  <DestinationTypeEnumVal>CONSIGNEE</DestinationTypeEnumVal>\n' +
  '\n' +
  '  <DestinationName>DETROIT</DestinationName>\n' +
  '\n' +
  '  <DestinationAddress>\n' +
  '    <DestinationBlock>18999</DestinationBlock>\n' +
  '    <DestinationStreet>MAINE ST</DestinationStreet>\n' +
  '    <DestinationCity>DETROIT</DestinationCity>\n' +
  '    <DestinationPostalCode>48234</DestinationPostalCode>\n' +
  '    <DestinationStateCode>MI</DestinationStateCode>\n' +
  '    <DestinationCountryCode>USA</DestinationCountryCode>\n' +
  '    <DestinationTimeZoneOffset>0.000000</DestinationTimeZoneOffset>\n' +
  '  </DestinationAddress><DestinationShippingLocation>\n' +
  '    <DestinationShippingLocationName>DETROIT</DestinationShippingLocationName>\n' +
  '    <DestinationShippingLocationContact>\n' +
  '      <DestinationShippingLocationContactPrimaryTelephoneNumber>(123) 132-1312 [3   ]</DestinationShippingLocationContactPrimaryTelephoneNumber>\n' +
  '    </DestinationShippingLocationContact>\n' +
  '    <DestinationShippingLocationTimeZoneOffset>0.000000</DestinationShippingLocationTimeZoneOffset>\n' +
  '  </DestinationShippingLocation><CustomerCode>ROZ</CustomerCode>\n' +
  '\n' +
  '  <BillToCustomerCode>ROZ</BillToCustomerCode>\n' +
  '\n' +
  '  <CSR>ROZ</CSR>\n' +
  '\n' +
  '  <SalesPersonCode>ROZ</SalesPersonCode>\n' +
  '\n' +
  '  <ShipmentInfo>\n' +
  '    <Pieces>0.000000</Pieces>\n' +
  '    <Skids>10.000000</Skids>\n' +
  '    <Volume>0.000000</Volume>\n' +
  '    <Weight>1000.000000</Weight>\n' +
  '  </ShipmentInfo><UOM>\n' +
  '    <VolumeUOM>FT</VolumeUOM>\n' +
  '    <WeightUOM>LB</WeightUOM>\n' +
  '  </UOM><OnHold>bFALSE</OnHold>\n' +
  '\n' +
  '  <Urgent>bFALSE</Urgent>\n' +
  '\n' +
  '  <CommodityCode>001</CommodityCode>\n' +
  '\n' +
  '  <FreightTerm>PREPAID</FreightTerm>\n' +
  '\n' +
  '  <Customer>\n' +
  '    <CurrentCustomerVersion>\n' +
  '      <CustomerName>ROZ CUSTOMER</CustomerName>\n' +
  '      <CustomerAddress>\n' +
  '        <CustomerAddressBlock>159</CustomerAddressBlock>\n' +
  '        <CustomerAddressStreet>ZAPH AVE</CustomerAddressStreet>\n' +
  '        <CustomerAddressCity>SCARBOROUGH</CustomerAddressCity>\n' +
  '        <CustomerAddressPostalCode>M1C1M9</CustomerAddressPostalCode>\n' +
  '        <CustomerAddressStateCode>ON</CustomerAddressStateCode>\n' +
  '        <CustomerAddressCountryCode>CAN</CustomerAddressCountryCode>\n' +
  '        <CustomerAddressTimeZoneOffset>0.000000</CustomerAddressTimeZoneOffset>\n' +
  '      </CustomerAddress>\n' +
  '    </CurrentCustomerVersion>\n' +
  '    <POD>PODDLVNTFNTR</POD>\n' +
  '    <CustomerBusinessHours>\n' +
  '      <CustomerBusinessHoursTimeZoneOffset>0.000000</CustomerBusinessHoursTimeZoneOffset>\n' +
  '    </CustomerBusinessHours>\n' +
  '  </Customer><BillToCustomer>\n' +
  '    <CurrentBillToCustomerVersion>\n' +
  '      <BillToCustomerName>ROZ CUSTOMER</BillToCustomerName>\n' +
  '      <BillToCustomerAddress>\n' +
  '        <BillToCustomerAddressBlock>159</BillToCustomerAddressBlock>\n' +
  '        <BillToCustomerAddressStreet>ZAPH AVE</BillToCustomerAddressStreet>\n' +
  '        <BillToCustomerAddressCity>SCARBOROUGH</BillToCustomerAddressCity>\n' +
  '        <BillToCustomerAddressPostalCode>M1C1M9</BillToCustomerAddressPostalCode>\n' +
  '        <BillToCustomerAddressStateCode>ON</BillToCustomerAddressStateCode>\n' +
  '        <BillToCustomerAddressCountryCode>CAN</BillToCustomerAddressCountryCode>\n' +
  '        <BillToCustomerAddressTimeZoneOffset>0.000000</BillToCustomerAddressTimeZoneOffset>\n' +
  '      </BillToCustomerAddress>\n' +
  '    </CurrentBillToCustomerVersion>\n' +
  '    <BillToCustomerBusinessHours>\n' +
  '      <BillToCustomerBusinessHoursTimeZoneOffset>0.000000</BillToCustomerBusinessHoursTimeZoneOffset>\n' +
  '    </BillToCustomerBusinessHours>\n' +
  '  </BillToCustomer><PickupFromDateTime>2018-02-12T18:15:00</PickupFromDateTime>\n' +
  '\n' +
  '  <PickupToDateTime>2018-02-13T18:15:00</PickupToDateTime>\n' +
  '\n' +
  '  <DeliveryFromDateTime>2018-02-13T18:15:00</DeliveryFromDateTime>\n' +
  '\n' +
  '  <DeliveryToDateTime>2018-02-16T18:15:00</DeliveryToDateTime>\n' +
  '\n' +
  '  <ShipmentCreationDateTime>2018-02-12T18:15:27</ShipmentCreationDateTime>\n' +
  '\n' +
  '  <ShipmentContainer>\n' +
  '    <ContainerId>282041</ContainerId>\n' +
  '    <ContainerType>\n' +
  '      <ContainerTypeCode>SKID</ContainerTypeCode>\n' +
  '      <ContainerTypeExternalID>PLT</ContainerTypeExternalID>\n' +
  '    </ContainerType>\n' +
  '    <ContainerDescription>SKID</ContainerDescription>\n' +
  '    <ContainerQuantity>10.000000</ContainerQuantity>\n' +
  '    <ContainerLength>0.000000</ContainerLength>\n' +
  '    <ContainerWidth>0.000000</ContainerWidth>\n' +
  '    <ContainerHeight>0.000000</ContainerHeight>\n' +
  '    <ContainerRatingUnitType>PALLETS</ContainerRatingUnitType>\n' +
  '    <ContainerShippingInfo>\n' +
  '      <ContainerShippingInfoWeight>1000.000000</ContainerShippingInfoWeight>\n' +
  '      <ContainerShippingInfoVolume>0.000000</ContainerShippingInfoVolume>\n' +
  '      <ContainerShippingInfoOrderValue>0.000000</ContainerShippingInfoOrderValue>\n' +
  '    </ContainerShippingInfo>\n' +
  '    <ContainerMarkedForLocationEnumVal>0</ContainerMarkedForLocationEnumVal>\n' +
  '    <ContainerCommodityCodeDetail>\n' +
  '      <ContainerCommodityCode>001</ContainerCommodityCode>\n' +
  '    </ContainerCommodityCodeDetail>\n' +
  '    <StackingRuleEnumVal>0</StackingRuleEnumVal>\n' +
  '    <CarrierPackagingTypeVal>0</CarrierPackagingTypeVal>\n' +
  '    <SplitMethodEnumVal>NONE</SplitMethodEnumVal>\n' +
  '    <SystemItemMasterID>0</SystemItemMasterID>\n' +
  '    <ItemPackageLevelCode>0</ItemPackageLevelCode>\n' +
  '    <ContentQuantity>0.000000</ContentQuantity>\n' +
  '    <Is3DLoadingRequired>bFALSE</Is3DLoadingRequired>\n' +
  '    <ItemType>0</ItemType>\n' +
  '    <ContentLevel>0</ContentLevel>\n' +
  '    <Priority>0</Priority>\n' +
  '    <IsItemPackagingCommitted>bFALSE</IsItemPackagingCommitted>\n' +
  '  </ShipmentContainer>\n' +
  '\n' +
  '  <ShipmentLeg>\n' +
  '    <SystemShipmentLegID>100186316</SystemShipmentLegID>\n' +
  '    <ShipmentItinerarySeqNum>100</ShipmentItinerarySeqNum>\n' +
  '    <ShipmentLegOriginCode>TORONTO</ShipmentLegOriginCode>\n' +
  '    <ShipmentLegOriginEnumVal>LA</ShipmentLegOriginEnumVal>\n' +
  '    <ShipmentLegOriginAddress>\n' +
  '      <ShipmentLegOriginBlock>255</ShipmentLegOriginBlock>\n' +
  '      <ShipmentLegOriginStreet>MAIN ST</ShipmentLegOriginStreet>\n' +
  '      <ShipmentLegOriginCity>TORONTO</ShipmentLegOriginCity>\n' +
  '      <ShipmentLegOriginPostalCode>M4C4X2</ShipmentLegOriginPostalCode>\n' +
  '      <ShipmentLegOriginStateCode>ON</ShipmentLegOriginStateCode>\n' +
  '      <ShipmentLegOriginCountryCode>CAN</ShipmentLegOriginCountryCode>\n' +
  '      <ShipmentLegOriginTimeZoneOffset>0.000000</ShipmentLegOriginTimeZoneOffset>\n' +
  '    </ShipmentLegOriginAddress>\n' +
  '    <ShipmentLegDestinationCode>DETROIT</ShipmentLegDestinationCode>\n' +
  '    <ShipmentLegDestinationEnumVal>CONSIGNEE</ShipmentLegDestinationEnumVal>\n' +
  '    <ShipmentLegDestinationAddress>\n' +
  '      <ShipmentLegDestinationBlock>18999</ShipmentLegDestinationBlock>\n' +
  '      <ShipmentLegDestinationStreet>MAINE ST</ShipmentLegDestinationStreet>\n' +
  '      <ShipmentLegDestinationCity>DETROIT</ShipmentLegDestinationCity>\n' +
  '      <ShipmentLegDestinationPostalCode>48234</ShipmentLegDestinationPostalCode>\n' +
  '      <ShipmentLegDestinationStateCode>MI</ShipmentLegDestinationStateCode>\n' +
  '      <ShipmentLegDestinationCountryCode>USA</ShipmentLegDestinationCountryCode>\n' +
  '      <ShipmentLegDestinationTimeZoneOffset>0.000000</ShipmentLegDestinationTimeZoneOffset>\n' +
  '    </ShipmentLegDestinationAddress>\n' +
  '    <SystemPickUpStopID>0</SystemPickUpStopID>\n' +
  '    <SystemDropStopID>0</SystemDropStopID>\n' +
  '    <ShipmentLegOriginShippingLocation>\n' +
  '      <ShipmentLegOriginShippingLocationTimeZoneOffset>0.000000</ShipmentLegOriginShippingLocationTimeZoneOffset>\n' +
  '    </ShipmentLegOriginShippingLocation>\n' +
  '    <ShipmentLegDestinationShippingLocation>\n' +
  '      <ShipmentLegDestinationShippingLocationTimeZoneOffset>0.000000</ShipmentLegDestinationShippingLocationTimeZoneOffset>\n' +
  '    </ShipmentLegDestinationShippingLocation>\n' +
  '  </ShipmentLeg>\n' +
  '\n' +
  '  <SplitMethod>NONE</SplitMethod>\n' +
  '\n' +
  '  <NumberRelatedSplitShipments>0</NumberRelatedSplitShipments>\n' +
  '\n' +
  '</CISDocument>\n';*/


/*var SERVER_ADDRESS = 'c71dq72j.jda.corp.local';
var SERVER_PORT = 61613;
var QUEUE = '/queue/Shipment';*/

var SERVER_ADDRESS = 'localhost';
var SERVER_PORT = 61613;
var QUEUE = '/queue/Shipment';


var StompClient = require('stomp-client');
var stompClient = new StompClient(SERVER_ADDRESS, SERVER_PORT, '', '', '1.0');
var xml = null;
stompClient.connect(function() {
    stompClient.subscribe(QUEUE, function(data, headers){
      xml = data;
      console.log('XML--------------->'+xml);

      // converts to json obect
      var to_json = require('xmljson').to_json;
      var SchemaObject = require('node-schema-object');

      to_json(xml, function (error, data) {

        var Shipment = new SchemaObject({
          $class: "com.jda.shipment.visibility.Shipment",
          shipmentId: String,
          shipmentStatus: String,
          freightTerms: String,
        });

        // creating JSON object
        var shipment = new Shipment();
        shipment.$class = 'com.jda.shipment.visibility.Shipment';
        shipment.shipmentId = data.CISDocument.SystemShipmentID;
        shipment.shipmentStatus = 'DSTS_SHPM_D_PROCESSING';//data.CISDocument.EventName;
        shipment.freightTerms = 'FT_COLLECT';//data.CISDocument.FreightTerm;

        shipment = JSON.stringify(shipment);
        console.log('JSON--------------------->'+shipment);



        // Post request to block chain server
        var http = require('http');
        var postheaders = {
          'Content-Type' : 'application/json',
          'Content-Length' : Buffer.byteLength(shipment, 'utf8')
        };
        var optionspost = {
          host : '35.200.212.213',
          port : 3000,
          path : '/api/Shipment',
          method : 'POST',
          headers : postheaders
        };

        var reqPost = http.request(optionspost, function(res) {
          console.log("statusCode: ", res.statusCode);
          res.on('data', function(d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
          });
        });

        reqPost.write(shipment);
        reqPost.end();
        reqPost.on('error', function(e) {
          console.error(e);
        });


      });


    });
});









