import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripOrganiserComponent } from './trip-organiser/trip-organiser.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenienceOptionsComponent } from './convenience-options/convenience-options.component';

@NgModule({
  declarations: [TripOrganiserComponent, ConvenienceOptionsComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [MaterialModule, TripOrganiserComponent, ConvenienceOptionsComponent]
})
export class SharedModule { }
