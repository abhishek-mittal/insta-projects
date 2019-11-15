import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'it-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private _authS: AuthService, private route: Router) {
  }

  ngOnInit() {
    console.log('app');
    this.isLoggedIn = this._authS.isAuthenticated();
  }

  submitLoginLogout() {
    if (this._authS.isAuthenticated()) {
      localStorage.clear();
      alert('succesfully logged out');
      this.isLoggedIn = false;
      this.route.navigateByUrl('/app/s1');
      return;
    }
    this.route.navigateByUrl('/auth/login');
  }



}
