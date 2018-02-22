import { Component } from '@angular/core';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent {
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
        "label": "Delayed",
        "value": "50"
      },
      {
        "label": "In-Transit",
        "value": "30"
      },
      {
        "label": "On-Time",
        "value": "20"
      }
    ]
  };

  countriesDataSource = {
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
  };
}
