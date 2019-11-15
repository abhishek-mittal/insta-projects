import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './../models/user';

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
    return this.http.post(`${environment.apiUrl}/login`, credentials).pipe(map((res: LoginResponse) => {
      if (res.status === true) {
        this.setTokenToLocalStorage(res);
        return 'USER_LOGGED_IN';
      }
      return res.error.message || 'ACCESS_DENIED';
    }));
  }

  validateToken() {
    return this.http.get(`${environment.apiUrl}/validate`);
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}
