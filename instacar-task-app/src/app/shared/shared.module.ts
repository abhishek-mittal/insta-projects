import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripOrganiserComponent } from './trip-organiser/trip-organiser.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenienceOptionsComponent } from './convenience-options/convenience-options.component';
import { TripSummaryComponent } from './trip-summary/trip-summary.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [TripOrganiserComponent, ConvenienceOptionsComponent, TripSummaryComponent, PaymentComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [MaterialModule, TripOrganiserComponent, ConvenienceOptionsComponent, TripSummaryComponent, PaymentComponent]
})
export class SharedModule { }
