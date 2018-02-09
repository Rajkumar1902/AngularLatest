import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


import { SHIPMENTS } from '../shared/TempData/shipments';
import { Shipment } from '../shared/shipment';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit {

  displayedColumns = ['shipmentId', 'shipFromLocation', 'shipToLocation', 'pickupFromDateTime',
    'pickupToDateTime', 'deliveryFromDateTime', 'deliveryToDateTime', 'commodityCode', 'unitOfMeasure'];
  dataSource = new MatTableDataSource<Shipment>(SHIPMENTS);

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

  constructor() { }

  ngOnInit() {
  }

}
