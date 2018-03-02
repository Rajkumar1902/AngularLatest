import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


import { SHIPMENTS } from '../shared/TempData/shipments';
import { Shipment } from '../shared/shipment';

import { ShipperService } from '../services/shipper.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  displayedColumns = ['shipmentId', 'shipmentStatus', 'shipFromLocation', 'shipToLocation', 'pickupFromDateTime',
    'pickupToDateTime', 'deliveryFromDateTime', 'deliveryToDateTime', ];

  shipments: Shipment[];
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

  constructor(private shipperService: ShipperService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.shipperService.getShipments().subscribe(shipments => {this.shipments = shipments;
      this.dataSource = new MatTableDataSource<Shipment>(/*SHIPMENTS*/this.shipments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    /*let tempList = [];
    return this.shipperService.getShipments()
      .toPromise()
      .then((result) => {
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.shipments = tempList;
        console.log(this.shipments);
      });*/
  }

}
