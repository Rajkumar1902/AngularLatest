import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { Component } from '@angular/core/src/metadata/directives';
import { ShipperComponent } from '../shipper/shipper.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'shipper', component: ShipperComponent},
    { path: 'carrier', component: ShipperComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];