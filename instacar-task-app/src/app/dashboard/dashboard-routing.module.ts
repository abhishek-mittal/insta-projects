import { PaymentGuard } from './../shared/gaurds/payment.guard';
import { PaymentComponent } from './../shared/payment/payment.component';
import { ConvenienceOptionsComponent } from './../shared/convenience-options/convenience-options.component';
import { TripOrganiserComponent } from './../shared/trip-organiser/trip-organiser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 's1',
    component: DashboardComponent
  },
  {
    path: 's1',
    component: TripOrganiserComponent
  },
  {
    path: 's2',
    component: ConvenienceOptionsComponent
  },
  {
    path: 's3',
    component: PaymentComponent,
    canActivate: [PaymentGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
