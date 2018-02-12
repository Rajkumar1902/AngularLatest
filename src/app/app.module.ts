import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import {baseURL} from './shared/baseurl';

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

} from '@angular/material';

import {AppRoutingModule} from './app-routing/app-routing.module';


import { AppComponent } from './app.component';

import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShipperComponent } from './shipper/shipper.component';

import { ShipperService } from './services/shipper.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShipperComponent,
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
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    ShipperService, {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
