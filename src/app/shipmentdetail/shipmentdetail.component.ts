import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Shipment} from '../shared/shipment';
import {ShipmentLegStatus} from '../shared/shipmentlegstatus';
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

  displayedColumns = ['shipmentLegId', 'shipmentLegStatus', 'shipFromLocation', 'shipToLocation', /*'computedArrivalDateTimeFromLocation',*/
    'actualArrivalDateTimeFromLocation', /*'computedDepartureDateTimeFromLocation', */'actualDepartureDateTimeFromLocation',/*, 'computedArrivalDateTimeToLocation',
  'actualArrivalDateTimeToLocation', 'computedDepartureDateTimeToLocation', 'actualDepartureDateTimeToLocation'*/];
  dataSource: MatTableDataSource<ShipmentLegs>;
  shipment: Shipment;
  shipmentLegStatus: ShipmentLegStatus.DSTS_SL_D_DELIVERED;
  panelOpenState = false;

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
              @Inject('BaseURL') private BaseURL) {
    console.log('***********************'+ this.shipmentLegStatus);
  }

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

  /*calculateArrivalDelay() {
    for (const shipmentLeg of this.shipment.shipmentLegs) {
      //console.log(entry); // 1, "string", false
     // console.log(Math.round(new Date(shipmentLeg.computedArrivalDateTimeFromLocation)-new Date('2019-01-05T00:00:00.000Z'))/3600000);

      console.log('Arrival-------------->'+ shipmentLeg.actualArrivalDateTimeFromLocation);

      if(shipmentLeg.computedArrivalDateTimeFromLocation != null && shipmentLeg.actualArrivalDateTimeFromLocation != null)
        //shipmentLeg.arrivalDelay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date('2019-01-05T14:00:00.000Z')) / 3600000;
        shipmentLeg.arrivalDelay = Math.round((<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date(shipmentLeg.actualArrivalDateTimeFromLocation)) / 3600000);
      else
        shipmentLeg.arrivalDelay = null;

      if(shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null)
      //shipmentLeg.arrivalDelay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date('2019-01-05T14:00:00.000Z')) / 3600000;
        shipmentLeg.departureDelay = Math.round((<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000);
      else
        shipmentLeg.departureDelay = null;
      console.log('calculating arrival delay' + shipmentLeg.arrivalDelay);
    }
  }*/

  calculateArrivalDelay(){

    let previousLeg:ShipmentLegs;


    for ( let index = 0; index < this.shipment.shipmentLegs.length; index++) {
      let shipmentLeg : ShipmentLegs = this.shipment.shipmentLegs[index];

      if(index == 0) {
        if( shipmentLeg.computedArrivalDateTimeFromLocation != null && shipmentLeg.actualArrivalDateTimeFromLocation != null)
          shipmentLeg.arrivalDelay = Math.round(<any>new Date(shipmentLeg.computedArrivalDateTimeFromLocation) - <any>new Date(shipmentLeg.actualArrivalDateTimeFromLocation)) / 3600000;
        else
          shipmentLeg.arrivalDelay = null;


        if(shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null)
          shipmentLeg.departureDelay = Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000;
        else
          shipmentLeg.departureDelay = null;
      } else {
          if( previousLeg.computedArrivalDateTimeToLocation != null && previousLeg.actualArrivalDateTimeToLocation != null)
            shipmentLeg.arrivalDelay = Math.round(<any>new Date(previousLeg.computedArrivalDateTimeFromLocation) - <any>new Date(previousLeg.actualArrivalDateTimeFromLocation)) / 3600000;
          else
            shipmentLeg.arrivalDelay = null;


          if(shipmentLeg.computedDepartureDateTimeFromLocation != null && shipmentLeg.actualDepartureDateTimeFromLocation != null)
            shipmentLeg.departureDelay = Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000;
          else
            shipmentLeg.departureDelay = null;
      }
      previousLeg = this.shipment.shipmentLegs[index];

      //console.log(shipmentLeg.computedDepartureDateTimeFromLocation + " "+shipmentLeg.actualDepartureDateTimeFromLocation);
      //console.log(Math.round(Math.round(<any>new Date(shipmentLeg.computedDepartureDateTimeFromLocation) - <any>new Date(shipmentLeg.actualDepartureDateTimeFromLocation)) / 3600000));
      //console.log("arrival delay "+shipmentLeg.arrivalDelay);
      //console.log("departure delay "+shipmentLeg.departureDelay);
    }
    }
  }


