import {Component, OnInit} from '@angular/core';
import { ShipperService } from '../services/shipper.service';
import { Shipment } from '../shared/shipment';

import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Params} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ShipmentLegs} from '../shared/shipmentlegs';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit{
  totalShipmentCnt: number;
  onTimeShipmentCnt: number;
  delayedShipmentCnt: number;
  inTransitShipmentCnt: number;
  notStartedShipmentCnt: number;
  shipments: Shipment[];
  shipmentIdControl: FormControl;
  filteredShipments: Observable<any[]>;
  selectedShipmentId: string;
  width = 500;
  height = 300;
  type = 'pie2d';
  dataFormat = 'json';
  shipmentStatusDataSource = {
    "chart": {
      "caption": "Shipment Status",
      "subcaption": "",
      "startingangle": "120",
      "showlabels": "1",
      "showlegend": "1",
      "enablemultislicing": "0",
      "slicingdistance": "15",
      "showpercentvalues": "0",
      "showpercentintooltip": "0",
      "plottooltext": "Shipments : $label Total : $datavalue",
      "theme": "fint"
    },
    "data": [
      {
        "label": "In-Transit %",
        "value": "30"
      },
      {
        "label": "On-Time %",
        "value": "50"
      },
      {
        "label": "Delayed %",
        "value": "20"
      },

    ]
  };

  constructor(private shipperService: ShipperService){}

  ngOnInit() {
    this.shipperService.getShipments().subscribe(shipments => {
      this.shipments = shipments;
      this.totalShipmentCnt = this.shipments.length;
      this.shipmentIdControl = new FormControl();
      this.filteredShipments = this.shipmentIdControl.valueChanges
        .pipe(
          startWith(''),
          map(shipmentId => shipmentId ? this.filterShipments(shipmentId) : this.shipments.slice())
        );

      this.onTimeShipmentCnt =  this.delayedShipmentCnt = this.shipments.filter(
        shipment => shipment.shipmentStatus == 'DSTS_SHPM_D_DELIVERED' && this.getDelay(shipment) >= 0 ).length;

      this.inTransitShipmentCnt = this.shipments.filter(shipment => shipment.shipmentStatus == 'DSTS_SHPM_D_IN_TRANSIT').length;

      this.delayedShipmentCnt = this.shipments.filter(
        shipment => shipment.shipmentStatus == 'DSTS_SHPM_D_DELIVERED' && this.getDelay(shipment) < 0 ).length;

      this.notStartedShipmentCnt = this.shipments.filter(
        shipment => shipment.shipmentStatus == 'DSTS_SHPM_D_PROCESSING'
          || shipment.shipmentStatus == 'DSTS_SHPM_D_ASSIGNED_TO_CARRIER'
          || shipment.shipmentStatus == null).length;

      this.shipments.filter(shipment => console.log(shipment.shipmentStatus));

      console.log(this.totalShipmentCnt);

    });
  }

  getDelay(shipment) : number {
    var lastLeg = shipment.shipmentLegs.length - 1;
    var delay =  Math.round(<any>new Date(shipment.shipmentLegs[lastLeg].computedArrivalDateTimeToLocation) -
      <any>new Date(shipment.shipmentLegs[lastLeg].actualArrivalDateTimeToLocation)) / 3600000;
    console.log('Delay is:::::::'+delay);
    return delay;
  }

  filterShipments(id: string) {
    return this.shipments.filter(shipment =>
      shipment.shipmentUserId.toLowerCase().includes(id.toLowerCase()));
  }

  setShipmentId(shipmentId: string) {
    this.selectedShipmentId = shipmentId;
  }

  getOnTimePercent(){
    //return Math.round((this.onTimeShipmentCnt/this.totalShipmentCnt)*100)+"%";
    return "70%";
  }

  getDelayedPercent(){
    return Math.round((this.delayedShipmentCnt/this.totalShipmentCnt)*100)+"%";
  }

  getInTransitPercent(){
    return Math.round((this.inTransitShipmentCnt/this.totalShipmentCnt)*100)+"%";
  }

  getNotStartedPercent(){
    return Math.round((this.notStartedShipmentCnt/this.totalShipmentCnt)*100)+"%";
  }


}
