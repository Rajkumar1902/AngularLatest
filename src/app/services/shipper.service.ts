import { Injectable } from '@angular/core';
import { Shipment} from '../shared/shipment';
import { SHIPMENTS } from '../shared/TempData/shipments';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class ShipperService {

  constructor(private restAngular: Restangular) { }

  getShipments(): Observable<Shipment[]> {
    //console.log(this.restAngular.all('/api/Shipment').getList());
      return this.restAngular.all('/api/Shipment').getList();
    //return Observable.of(SHIPMENTS);
  }

  getShipment(id: number): Observable<Shipment> {
    console.log("inside shipment detail service call");
    console.log(this.restAngular.one('/api/Shipment', id).get());
    return this.restAngular.one('/api/Shipment', id).get();
    //return Observable.of(SHIPMENTS);
  }
}
