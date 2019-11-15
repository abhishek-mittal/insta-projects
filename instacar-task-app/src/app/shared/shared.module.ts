import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripOrganiserComponent } from './components/trip-organiser/trip-organiser.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenienceOptionsComponent } from './components/convenience-options/convenience-options.component';
import { TripSummaryComponent } from './components/trip-summary/trip-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [TripOrganiserComponent, ConvenienceOptionsComponent, TripSummaryComponent, PaymentComponent, LoginComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [MaterialModule, TripOrganiserComponent, ConvenienceOptionsComponent, TripSummaryComponent, PaymentComponent, LoginComponent]
})
export class SharedModule { }
