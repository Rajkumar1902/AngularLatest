import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Shipment} from '../shared/shipment';
import { ShipperService } from '../services/shipper.service';
import { Params, ActivatedRoute } from '@angular/router';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

import 'rxjs/add/operator/switchMap';
import {ShipmentLegs} from '../shared/shipmentlegs';

@Component({
  selector: 'app-shipmentdetail',
  templateUrl: './shipmentdetail.component.html',
  styleUrls: ['./shipmentdetail.component.scss']
})
export class ShipmentdetailComponent implements OnInit {

  displayedColumns = ['shipmentLegId', 'shipmentLegStatus', 'shipFromLocation', 'shipToLocation', 'computedArrivalDateTimeFromLocation',
    'actualArrivalDateTimeFromLocation', 'computedDepartureDateTimeFromLocation', 'actualDepartureDateTimeFromLocation'/*, 'computedArrivalDateTimeToLocation',
  'actualArrivalDateTimeToLocation', 'computedDepartureDateTimeToLocation', 'actualDepartureDateTimeToLocation'*/];
  dataSource: MatTableDataSource<ShipmentLegs>;
  shipment: Shipment;

  errMess: string;
  count: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private shipperService: ShipperService,
              private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.shipperService.getShipment(+params['id']);
      })
      .subscribe(shipment => { this.shipment = shipment;
          this.calculateArrivalDelay();
          this.count = this.shipment.shipmentLegs.length;
          this.dataSource = new MatTableDataSource<ShipmentLegs>(this.shipment.shipmentLegs);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          },
        errmess => this.errMess = <any>errmess);
  }

  calculateArrivalDelay(){
    for (let shipmentLeg of this.shipment.shipmentLegs) {
      //console.log(entry); // 1, "string", false
     // console.log(Math.round(new Date(shipmentLeg.computedArrivalDateTimeFromLocation)-new Date('2019-01-05T00:00:00.000Z'))/3600000);
      shipmentLeg.arrivalDelay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation)-<any>new Date('2019-01-05T14:00:00.000Z'))/3600000;
      console.log("calculating arrival delay"+shipmentLeg.arrivalDelay);
    }
  }
  }


