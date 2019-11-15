import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAccess = this._auth.isAuthenticated();
    if (!isAccess) {
      localStorage.setItem('lastActiveRoute', state.url+'');
      this.router.navigateByUrl('/auth/login');
    }
    return isAccess;
  }
}
