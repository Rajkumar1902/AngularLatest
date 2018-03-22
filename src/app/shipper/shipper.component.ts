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
  totalShipments: number;

  shipments: Shipment[];
  shipmentIdControl: FormControl;
  filteredShipments: Observable<any[]>;

  selectedShipmentId: string;

  width = 500;
  height = 300;
  type = 'pie3d';
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
        "label": "In-Transit",
        "value": "30"
      },
      {
        "label": "On-Time",
        "value": "20"
      },
      {
        "label": "Delayed",
        "value": "50"
      },

    ]
  };

  /*countriesDataSource = {
    "chart": {
      "caption": "Countries",
      "subcaption": "",
      "startingangle": "120",
      "showlabels": "1",
      "showlegend": "1",
      "enablemultislicing": "0",
      "slicingdistance": "15",
      "showpercentvalues": "0",
      "showpercentintooltip": "0",
      "plottooltext": "countries : $label Total : $datavalue",
      "theme": "fint"
    },
    "data": [
      {
        "label": "Denmark",
        "value": "20"
      },
      {
        "label": "Colombo",
        "value": "30"
      },
      {
        "label": "Belgium",
        "value": "20"
      }
    ]
  };*/


  constructor(private shipperService: ShipperService){


  }

  ngOnInit() {
    this.shipperService.getShipments().subscribe(shipments => {
      this.shipments = shipments;
      this.totalShipments = this.shipments.length;

      this.shipmentIdControl = new FormControl();
      this.filteredShipments = this.shipmentIdControl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.shipments.slice())
        );
    });

  }




  /*states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];*/





  filterStates(shipmentId: string) {
    return this.shipments.filter(shipment =>
      shipment.shipmentId.toLowerCase().includes(shipmentId.toLowerCase()));
  }

  setShipmentId(shipmentId: string) {
    this.selectedShipmentId = shipmentId;
  }

}
