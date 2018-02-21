import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ShipperComponent } from '../shipper/shipper.component';
import { LoginComponent } from '../login/login.component';
import {CarrierComponent} from '../carrier/carrier.component';
import {FreightforwarderComponent} from '../freightforwarder/freightforwarder.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'shipper', component: ShipperComponent},
    { path: 'carrier', component: CarrierComponent},
    { path: 'freightforwarder', component: FreightforwarderComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
