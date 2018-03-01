import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ShipperComponent } from '../shipper/shipper.component';
import { LoginComponent } from '../login/login.component';
import {CarrierComponent} from '../carrier/carrier.component';
import {FreightforwarderComponent} from '../freightforwarder/freightforwarder.component';
import {ShipmentsComponent} from '../shipments/shipments.component';
import {ShipmentdetailComponent} from '../shipmentdetail/shipmentdetail.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'shipper', component: ShipperComponent},
    { path: 'carrier', component: CarrierComponent},
    { path: 'freightforwarder', component: FreightforwarderComponent},
    { path: 'login', component: LoginComponent},
    { path: 'shipments', component: ShipmentsComponent},
    { path: 'shipmentDetail/:id', component: ShipmentdetailComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
