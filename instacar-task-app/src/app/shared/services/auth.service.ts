import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

interface LoginResponse {
  code: number;
  status: boolean;
  data: User;
  token: string;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  setTokenToLocalStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('profile', JSON.stringify(data.data));
  }

  loginUser(credentials) {
    return this.http.post(`http://localhost:3000/login`, credentials).pipe(map( (res: LoginResponse) => {
      if(res.status === true) {
        this.setTokenToLocalStorage(res);
        return 'USER_LOGGED_IN';
      }
      return res.error.message || 'ACCESS_DENIED';
    }));
  }

  validateToken() {
    return this.http.get('http://localhost:3000/validate');
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}
