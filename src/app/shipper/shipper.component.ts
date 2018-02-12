import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


import { SHIPMENTS } from '../shared/TempData/shipments';
import { Shipment } from '../shared/shipment';

import { ShipperService } from '../services/shipper.service';


@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit {

  displayedColumns = ['shipmentId', 'shipFromLocation', 'shipToLocation', 'pickupFromDateTime',
    'pickupToDateTime', 'deliveryFromDateTime', 'deliveryToDateTime', 'commodityCode', 'unitOfMeasure'];

  shipments: Shipment[];
  dataSource = new MatTableDataSource<Shipment>(this.shipments);

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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private shipperService: ShipperService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.shipperService.getShipments().subscribe(shipments => this.shipments = shipments);
    //console.log(this.shipments);
  }

}
