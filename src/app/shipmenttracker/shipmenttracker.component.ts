import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Shipment } from '../shared/shipment';
import { ShipmentLegStatus } from '../shared/shipmentlegstatus';

import {ActivatedRoute, Params} from '@angular/router';
import {ShipperService} from '../services/shipper.service';
import {ShipmentLegs} from '../shared/shipmentlegs';

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

  constructor(private shipperService: ShipperService,
              private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.shipperService.getShipment(+params['id']);
      })
      .subscribe(shipment => { this.shipment = shipment;
          this.shipmentLegCount = this.shipment.shipmentLegs.length;
          this.calculateArrivalDelay();
          this.setLastShipmentLeg();
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
}
