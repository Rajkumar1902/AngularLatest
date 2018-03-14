import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService} from '../services/data.service';
import { ShipperService} from '../services/shipper.service';
import {Shipment} from '../shared/shipment';
import {MatTableDataSource} from '@angular/material';
import {User} from '../shared/user';
import {ParticipantService} from '../services/participant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  players: User[];
  loginUser: string;

  routerLink: String;

  playerTypes = [
    {value: 'shipper', viewValue: 'Shipper'},
    {value: 'carrier', viewValue: 'Carrier'},
    {value: 'freightforwarder', viewValue: 'Freight Forwarder'}
  ];

 /* shippers = [
    {value: '0', viewValue: 'Shipper 1'},
    {value: '1', viewValue: 'Shipper 2'}
   ];*/
  shippers: User[];
  carriers: User[];
  freightForwarders: User[];

  /*carriers = [
    {value: '0', viewValue: 'Carrier 1'},
    {value: '1', viewValue: 'Carrier 2'},
   ];

  freightForwarders = [
    {value: '0', viewValue: 'Freight Forwarder 1'},
    {value: '1', viewValue: 'Freight Forwarder 2'},
  ];*/
  constructor(private router: Router, private data: DataService, private participantService: ParticipantService) { }

  ngOnInit() {
    this.participantService.getShippers().subscribe(shippers => {this.shippers = shippers; });
    this.participantService.getCarriers().subscribe(carriers => {this.carriers = carriers; });
    this.participantService.getSuppliers().subscribe(freightForwarders => {this.freightForwarders = freightForwarders; });

  }

  getPlayers(playerType): User[] {
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

  setPlayer(player){
    this.loginUser = player.uniqueId;
  }

  setLoginUser(){
    this.data.changeMessage(this.loginUser);
    sessionStorage.setItem('loginUser', this.loginUser);
  }

}
