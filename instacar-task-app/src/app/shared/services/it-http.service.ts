import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItHttpService {

  constructor(
    private http: HttpClient
  ) { }

  availableDrivers(journeyDetails: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/getDrivers`, journeyDetails);
  }
}
