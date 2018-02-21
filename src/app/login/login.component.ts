import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  players;

  routerLink: String;

  playerTypes = [
    {value: 'shipper', viewValue: 'Shipper'},
    {value: 'carrier', viewValue: 'Carrier'},
    {value: 'freightforwarder', viewValue: 'Freight Forwarder'}
  ];

  shippers = [
    {value: '0', viewValue: 'Shipper 1'},
    {value: '1', viewValue: 'Shipper 2'}
   ];

  carriers = [
    {value: '0', viewValue: 'Carrier 1'},
    {value: '1', viewValue: 'Carrier 2'},
   ];

  freightForwarders = [
    {value: '0', viewValue: 'Freight Forwarder 1'},
    {value: '1', viewValue: 'Freight Forwarder 2'},
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getPlayers(playerType): String[] {
    if(playerType.value === 'shipper') {
      this.players = this.shippers;
      this.routerLink = '/shipper';
    } else if(playerType.value === 'carrier') {
      this.players = this.carriers;
      this.routerLink = '/carrier';
    } else if(playerType.value === 'freightforwarder') {
      this.players = this.freightForwarders;
      this.routerLink = '/freightforwarder';
    }
    return this.players;
  }


}
