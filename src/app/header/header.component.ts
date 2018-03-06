import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginUser: string;
  constructor(private data: DataService) { console.log("In header.........."); }

  ngOnInit() {
    this.data.currentMessage.subscribe(user => this.loginUser = user);
  }

  resetLoginUser(){
    this.data.changeMessage('');
  }

}
