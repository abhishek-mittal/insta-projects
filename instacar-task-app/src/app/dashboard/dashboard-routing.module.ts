import { AuthGuard } from './../shared/gaurds/auth.guard';
import { TripSummaryComponent } from './../shared/components/trip-summary/trip-summary.component';
import { PaymentGuard } from './../shared/gaurds/payment.guard';
import { PaymentComponent } from '../shared/components/payment/payment.component';
import { ConvenienceOptionsComponent } from '../shared/components/convenience-options/convenience-options.component';
import { TripOrganiserComponent } from '../shared/components/trip-organiser/trip-organiser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from '../shared/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/s1', pathMatch: 'full' },
  { path: 's1', redirectTo: '/app/s1', pathMatch: 'full' },
  { path: 's2', redirectTo: '/app/s2', pathMatch: 'full' },
  { path: 's3', redirectTo: '/app/s3', pathMatch: 'full' },
  {
    path: 'app',
    component: DashboardComponent,
    children: [
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
        component: TripSummaryComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'auth/payment',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
