import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private loginUser = new BehaviorSubject<string>('');
  currentMessage = this.loginUser.asObservable();

  constructor() { }

  changeMessage(user: string) {
    this.loginUser.next(user);
  }

}
