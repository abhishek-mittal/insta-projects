import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItHttpService {

  constructor(
    private http: HttpClient
  ) { }

  availableDrivers(journeyDetails: any): Observable<any> {
    return this.http.post(`http://localhost:3000/getDrivers`, journeyDetails).pipe( map( (res: any) => res.data ));
  }
}
