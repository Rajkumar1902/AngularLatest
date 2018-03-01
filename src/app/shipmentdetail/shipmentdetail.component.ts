import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Shipment} from '../shared/shipment';
import { ShipperService } from '../services/shipper.service';
import { Params, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-shipmentdetail',
  templateUrl: './shipmentdetail.component.html',
  styleUrls: ['./shipmentdetail.component.scss']
})
export class ShipmentdetailComponent implements OnInit {

  shipment: Shipment;

  errMess: string;
  count: number;

  constructor(private shipperService: ShipperService,
              private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.shipperService.getShipment(+params['id']);
      })
      .subscribe(shipment => { this.shipment = shipment;
          console.log(this.shipment);
          this.count = this.shipment.shipmentLegs.length;
          },
        errmess => this.errMess = <any>errmess);
  }
  }


