import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { baseURL } from './shared/baseurl';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatStepperModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTooltipModule,
  MatExpansionModule, matExpansionAnimations

} from '@angular/material';

import {AppRoutingModule} from './app-routing/app-routing.module';


import { AppComponent } from './app.component';

import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShipperComponent } from './shipper/shipper.component';

import { ShipperService } from './services/shipper.service';
import { LoginComponent } from './login/login.component';
import { CarrierComponent } from './carrier/carrier.component';
import { FreightforwarderComponent } from './freightforwarder/freightforwarder.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ShipmentdetailComponent } from './shipmentdetail/shipmentdetail.component';
import { ShipmenttrackerComponent } from './shipmenttracker/shipmenttracker.component';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShipperComponent,
    LoginComponent,
    CarrierComponent,
    FreightforwarderComponent,
    ShipmentsComponent,
    ShipmentdetailComponent,
    ShipmenttrackerComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatStepperModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    MatSelectModule,
    FusionChartsModule,
    MatTooltipModule,
    MatExpansionModule
   ],
  providers: [
    ShipperService, DataService, {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
