import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListingsComponent } from './listings/listings.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ListingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  entryComponents: [DashboardComponent]
})
export class DashboardModule { }
