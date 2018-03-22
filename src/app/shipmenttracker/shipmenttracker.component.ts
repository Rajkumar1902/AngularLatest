import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Shipment } from '../shared/shipment';
import { ShipmentLegStatus } from '../shared/shipmentlegstatus';

import {ActivatedRoute, Params} from '@angular/router';
import {ShipperService} from '../services/shipper.service';
import {ShipmentLegs} from '../shared/shipmentlegs';
import { Node} from '../shared/node';

@Component({
  selector: 'app-shipmenttracker',
  templateUrl: './shipmenttracker.component.html',
  styleUrls: ['./shipmenttracker.component.scss']
})
export class ShipmenttrackerComponent implements OnInit {
  shipment: Shipment;
  errMess: string;
  shipmentLegStatus: ShipmentLegStatus;
  shipmentLegCount: number;
  lastShipmentLeg: ShipmentLegs;
  shipmentLeg: ShipmentLegs;
  nodes: Node[] = [];

  constructor(private shipperService: ShipperService,
              private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.loadTracker();
  }

  loadTracker(){
    this.nodes = [];
    this.route.params
      .switchMap((params: Params) => {
        return this.shipperService.getShipment(+params['id']);
      })
      .subscribe(shipment => { this.shipment = shipment;
          this.shipmentLegCount = this.shipment.shipmentLegs.length;
          this.calculateArrivalDelay();
          this.setLastShipmentLeg();
          this.populateNodes();
          this.setLineStyle(this.nodes);
        },
        errmess => this.errMess = <any>errmess);
  }

  calculateArrivalDelay() {
    for (const shipmentLeg of this.shipment.shipmentLegs) {
      if(shipmentLeg.computedArrivalDateTimeFromLocation != null && shipmentLeg.actualArrivalDateTimeFromLocation != null)
        shipmentLeg.arrivalDelay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date(shipmentLeg.actualArrivalDateTimeFromLocation)) / 3600000;
      else
        shipmentLeg.arrivalDelay = null;

      if(shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null)
        shipmentLeg.departureDelay = Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000;
      else
        shipmentLeg.departureDelay = null;
      console.log('calculating arrival delay' + shipmentLeg.arrivalDelay);
    }
  }

  setLastShipmentLeg(){
    this.lastShipmentLeg = this.shipment.shipmentLegs[this.shipmentLegCount - 1];
  }

  populateNodes() {
    var lastNode = new Node();

    var lastLeg:ShipmentLegs;
    var previousLeg:ShipmentLegs;

    for ( let index = 0; index<this.shipment.shipmentLegs.length; index++) {
      var node = new Node();
      let shipmentLeg:ShipmentLegs = this.shipment.shipmentLegs[index];

      if(index == this.shipment.shipmentLegs.length-1) {
        lastLeg = this.shipment.shipmentLegs[index];
      }

      this.setNodeStatus(index, shipmentLeg, node, previousLeg);

      node.locationName = shipmentLeg.shipFromLocation.locationName;
      node.city = shipmentLeg.shipFromLocation.city;
      node.country = shipmentLeg.shipFromLocation.country;
      this.setNodeArrivalTime(shipmentLeg, node, index, previousLeg);
      this.setNodeDepartureTime(shipmentLeg, node, index, previousLeg);

      this.setNodeDelay(index, shipmentLeg, node, previousLeg);
      this.setNodeIconStyle(node);

      console.log("printing status "+node.status);
      console.log("printing left status "+node.leftStatus);
      console.log("printing right status "+node.rightStatus);
      console.log("printing locName "+node.locationName);
      console.log("printing city "+node.city);
      console.log("printing country "+node.country);
      console.log("printing arrTime "+node.arrivalTime);
      console.log("printing depTime "+node.departureTime);
      console.log("printing delay "+node.delay);
      console.log("*************************************************");
      this.nodes.push(node);
      previousLeg = this.shipment.shipmentLegs[index];
    }

    this.populateLastNode(lastLeg, lastNode, previousLeg);

    console.log("printing status "+lastNode.status);
    console.log("printing locName "+lastNode.locationName);
    console.log("printing city "+lastNode.city);
    console.log("printing country "+lastNode.country);
    console.log("printing arrTime "+lastNode.arrivalTime);
    console.log("printing depTime "+lastNode.departureTime);
    console.log("printing delay "+lastNode.delay);
    console.log("*************************************************");
    console.log("printing calculated nodes" +this.nodes);
  }

  private populateLastNode(lastLeg: ShipmentLegs, lastNode: Node, previousLeg: ShipmentLegs) {
    this.setLastNodeStatus(lastLeg, lastNode, previousLeg);

    lastNode.locationName = lastLeg.shipToLocation.locationName;
    lastNode.city = lastLeg.shipToLocation.city;
    lastNode.country = lastLeg.shipToLocation.country;

    this.setLastNodeArrivalTime(lastLeg, lastNode);

    this.setLastNodeDepartureTime(lastLeg, lastNode);
    this.setLastNodeDelay(lastLeg, lastNode);
    this.setLastNodeIconStyle(lastNode);

    this.nodes.push(lastNode);
  }

  private setLastNodeIconStyle(lastNode: Node) {
    if (lastNode.delay >= 0 && (lastNode.status.toString() == "1" || lastNode.status.toString() == "DSTS_SL_D_DELIVERED"))
      lastNode.iconStyle = "md-step active done";
    else if (lastNode.delay < 0 && (lastNode.status.toString() == "1" || lastNode.status.toString() == "DSTS_SL_D_DELIVERED"))
      lastNode.iconStyle = "md-step delayed done";
    else {
      lastNode.iconStyle = "md-step";
      lastNode.nodeTitleStyle = "node-title-disabled";
    }
  }

  private setLastNodeDelay(lastLeg: ShipmentLegs, lastNode: Node) {
    if (lastLeg.shipmentLegStatus.toString() == "DSTS_SL_D_DELIVERED") {
      if (lastLeg.computedArrivalDateTimeToLocation != null && lastLeg.actualArrivalDateTimeToLocation != null)
        lastNode.delay = Math.round(<any>new Date(lastLeg.computedArrivalDateTimeToLocation) - <any>new Date(lastLeg.actualArrivalDateTimeToLocation)) / 3600000;
      else
        lastNode.delay = null;
    } else {
      lastNode.delay = null;
    }
  }

  private setLastNodeDepartureTime(lastLeg: ShipmentLegs, lastNode: Node) {
    if (lastLeg.actualDepartureDateTimeToLocation == null) {
      lastNode.departureTime = lastLeg.computedDepartureDateTimeToLocation;
    }
    else {
      lastNode.departureTime = lastLeg.actualDepartureDateTimeToLocation;
    }
  }

  private setLastNodeArrivalTime(lastLeg: ShipmentLegs, lastNode: Node) {
    if (lastLeg.actualArrivalDateTimeToLocation == null) {
      lastNode.arrivalTime = lastLeg.computedArrivalDateTimeToLocation;
    }
    else {
      lastNode.arrivalTime = lastLeg.actualArrivalDateTimeToLocation;
    }
  }

  private setLastNodeStatus(lastLeg: ShipmentLegs, lastNode: Node, previousLeg: ShipmentLegs) {
    if (lastLeg.shipmentLegStatus.toString() == "DSTS_SL_D_DELIVERED" || lastLeg.shipmentLegStatus.toString() == "DSTS_SL_D_IN_TRANSIT") {
      lastNode.status = lastLeg.shipmentLegStatus;
      lastNode.leftStatus = lastLeg.shipmentLegStatus;
    } else {
      lastNode.status = previousLeg.shipmentLegStatus;
      lastNode.leftStatus = previousLeg.shipmentLegStatus;//.DSTS_SL_D_ASSIGNED_TO_CARRIER;//ShipmentLegStatus.DSTS_SL_D_ASSIGNED_TO_CARRIER;//"DSTS_SL_D_ASSIGNED_TO_CARRIER";
    }
  }

  private setNodeIconStyle(node: Node) {
    if (node.delay >= 0 && (node.status.toString() == "1" || node.status.toString() == "DSTS_SL_D_DELIVERED"))
      node.iconStyle = "md-step active done";
    else if (node.delay < 0 && (node.status.toString() == "1" || node.status.toString() == "DSTS_SL_D_DELIVERED"))
      node.iconStyle = "md-step delayed done";
    else {
      node.iconStyle = "md-step";
      node.nodeTitleStyle = "node-title-disabled";
    }
  }

  private setNodeDelay(index: number, shipmentLeg: ShipmentLegs, node: Node, previousLeg: ShipmentLegs) {
    if (index == 0) {
      if (shipmentLeg.shipmentLegStatus.toString() == 'DSTS_SL_D_IN_TRANSIT'
        || shipmentLeg.shipmentLegStatus.toString() == 'DSTS_SL_D_DELIVERED') {

        if (shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null) {
          node.delay = Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000;
        }
      }
      else if (shipmentLeg.shipmentLegStatus.toString() != "DSTS_SL_D_IN_TRANSIT"
        && shipmentLeg.shipmentLegStatus.toString() != "DSTS_SL_D_DELIVERED" &&
        shipmentLeg.computedArrivalDateTimeFromLocation != null && shipmentLeg.actualArrivalDateTimeFromLocation != null) {
        node.delay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date(shipmentLeg.actualArrivalDateTimeFromLocation)) / 3600000;
      }
      else
        node.delay = null;
    }
    else if (shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null) {
      node.delay = Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000;
    } else if(previousLeg.computedArrivalDateTimeToLocation != null && previousLeg.actualArrivalDateTimeToLocation != null){
      node.delay = Math.round(<any>new Date(previousLeg.computedArrivalDateTimeToLocation) - <any>new Date(previousLeg.actualArrivalDateTimeToLocation)) / 3600000;
    }
    else
      node.delay = null;
  }

  private setNodeDepartureTime(shipmentLeg: ShipmentLegs, node: Node, index: number, previousLeg: ShipmentLegs) {
   /* if(index == 0){*/
      if (shipmentLeg.actualDepartureDateTimeFromLocation == null) {
        node.departureTime = shipmentLeg.computedDepartureDateTimeFromLocation;
      }
      else {
        node.departureTime = shipmentLeg.actualDepartureDateTimeFromLocation;
      }

  }

  private setNodeArrivalTime(shipmentLeg: ShipmentLegs, node: Node, index: number, previousLeg: ShipmentLegs) {
    if (index == 0) {
      if (shipmentLeg.actualArrivalDateTimeFromLocation == null) {
        node.arrivalTime = shipmentLeg.computedArrivalDateTimeFromLocation;
      } else {
        node.arrivalTime = shipmentLeg.actualArrivalDateTimeFromLocation;
      }
    }else {
      if (previousLeg.actualArrivalDateTimeToLocation == null) {
        node.arrivalTime = previousLeg.computedArrivalDateTimeToLocation;
      } else {
        node.arrivalTime = previousLeg.actualArrivalDateTimeToLocation;
      }
    }
  }


  private setNodeStatus(index: number, shipmentLeg: ShipmentLegs, node: Node, previousLeg: ShipmentLegs) {
    if (index == 0 && (shipmentLeg.shipmentLegStatus.toString() == "DSTS_SL_D_IN_TRANSIT" ||
        shipmentLeg.shipmentLegStatus.toString() == "DSTS_SL_D_DELIVERED")) {
        node.status = ShipmentLegStatus.DSTS_SL_D_PICKED_UP;
        node.leftStatus = null;
        node.rightStatus = ShipmentLegStatus.DSTS_SL_D_PICKED_UP;
    } else if (index == 0 && shipmentLeg.shipmentLegStatus.toString() != "DSTS_SL_D_IN_TRANSIT" && shipmentLeg.shipmentLegStatus.toString() != "DSTS_SL_D_DELIVERED") {
        node.status = shipmentLeg.shipmentLegStatus;
        //node.rightStatus = shipmentLeg.shipmentLegStatus;
        node.leftStatus = shipmentLeg.shipmentLegStatus;
    } else if (shipmentLeg.shipmentLegStatus.toString() == "DSTS_SL_D_IN_TRANSIT" ||
      shipmentLeg.shipmentLegStatus.toString() == "DSTS_SL_D_DELIVERED") {
        node.status = previousLeg.shipmentLegStatus;
        node.leftStatus = previousLeg.shipmentLegStatus;
        node.rightStatus = ShipmentLegStatus.DSTS_SL_D_DEPARTED;
    }else {
      node.status = previousLeg.shipmentLegStatus;
      node.leftStatus = previousLeg.shipmentLegStatus;
    }
  }

  setLineStyle(nodes:Node[]){

    for(let index = nodes.length-1; index > 0; index--) {

      if(nodes[index].status.toString() == "DSTS_SL_D_DELIVERED" ) {
        nodes[index].leftLineStyle = "left-delivered";
        if((index - 1) >= 0) nodes[index-1].rightLineStyle = "right-delivered";
      } else if (nodes[index].status.toString() == "DSTS_SL_D_IN_TRANSIT" && (index - 1) >= 0) {
        nodes[index-1].rightLineStyle = "right-delivered";
      }
    }
    console.log("printing node status******************************");
    for(let node of this.nodes) {
      console.log(node.leftLineStyle +","+node.rightLineStyle);
    }
  }

  refresh(){
    this.loadTracker();
  }


}
