import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private loginUser = new BehaviorSubject<string>(sessionStorage.getItem('loginUser'));
  currentMessage = this.loginUser.asObservable();

  constructor() { }

  changeMessage(user: string) {
    this.loginUser.next(user);
  }

}
