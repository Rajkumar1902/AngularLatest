import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class ParticipantService {

  constructor(private restAngular: Restangular) { }

  getShippers(): Observable<User[]> {
    return this.restAngular.all('/api/Shipper').getList();
  }

  getCarriers(): Observable<User[]> {
    return this.restAngular.all('/api/Carrier').getList();
  }

  getSuppliers(): Observable<User[]> {
    return this.restAngular.all('/api/Supplier').getList();
  }

}
