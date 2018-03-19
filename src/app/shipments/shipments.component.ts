import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


import { SHIPMENTS } from '../shared/TempData/shipments';
import { Shipment } from '../shared/shipment';

import { ShipperService } from '../services/shipper.service';
import { Params, ActivatedRoute, ParamMap  } from '@angular/router';
import {ShipmentLegs} from '../shared/shipmentlegs';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  displayedColumns = ['shipmentId', 'shipmentStatus', 'shipFromLocation', 'shipToLocation', 'pickupFromDateTime',
    'pickupToDateTime', 'deliveryFromDateTime', 'deliveryToDateTime', ];

  shipments: Shipment[];
  shipment: Shipment;
  errMess: string;
  dataSource: MatTableDataSource<Shipment>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  constructor(private shipperService: ShipperService, private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.loadGrid();
  }

  refresh(){
    this.loadGrid();
  }

  loadGrid(){
    /*this.shipperService.getShipments().subscribe(shipments => {this.shipments = shipments;
      this.dataSource = new MatTableDataSource<Shipment>(/!*SHIPMENTS*!/this.shipments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/

    this.route.params.subscribe((params : Params) => {
      var shipmentId = parseInt(params['id']);
      if (isNaN(shipmentId)) {
        this.getShipments();
      } else {
        this.getShipment(shipmentId);
      }
    });
  }

  getShipment(shipmentId: number){
    this.shipperService.getShipment(shipmentId).subscribe(shipment => {
        this.shipments = [];
        console.log(shipment.shipmentId);
        this.shipments.push(shipment);
        this.dataSource = new MatTableDataSource<Shipment>(this.shipments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      errmess => this.errMess = <any>errmess);
  }

  getShipments(){
    console.log("printing shipments");
    this.shipperService.getShipments().subscribe(shipments => {this.shipments = shipments;
      this.dataSource = new MatTableDataSource<Shipment>(this.shipments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
