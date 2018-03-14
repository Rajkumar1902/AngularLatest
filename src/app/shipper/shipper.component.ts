import {Component, OnInit} from '@angular/core';
import { ShipperService } from '../services/shipper.service';
import { Shipment } from '../shared/shipment';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit{
  totalShipments: number;
  shipments: Shipment[];
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

  constructor(private shipperService: ShipperService){}

  ngOnInit() {
    this.shipperService.getShipments().subscribe(shipments => {
      this.shipments = shipments;
      /*this.shipments.filter(

      )*/
      this.totalShipments = this.shipments.length;
    });

   /* function deliveredShipments(shipment){
        return shipment => shipment.shipmentStatus == 'DSTS_SHPM_D_DELIVERED';
    }*/
  }
}
