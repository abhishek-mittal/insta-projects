import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

declare var google: any;

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable({
  providedIn: 'root'
})
export class GAPIService {

  private apiKey: String;
  coordinates: Coordinates;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ''
  });

  constructor(
    private http: HttpClient
  ) {
    this.apiKey = environment.googleMapApiKey;
    this.loadScript();
  }

  public getLocation(): Observable<Coordinates> {
    return Observable.create(observer => {
      if (localStorage.getItem('coords')) {
        observer.next(JSON.parse(localStorage.getItem('coords')));
        observer.complete();
      } else if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position.coords);
            if (position.coords) {
              localStorage.setItem('coords', JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
            }
            observer.complete();
          },
          error => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          }
        );
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }
  public loadScript() {
    const body = <HTMLDivElement>document.body;
    const apiWithSrc = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
    this.scriptFactory(body, apiWithSrc);
  }
  public scriptFactory(body, src) {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = src;
    script.async = true;
    script.defer = true;
    let alreadyContainsScript = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length; i--;) {
      if (scripts[i].src === src) {
        alreadyContainsScript = true;
        break;
      }
    }
    if (!alreadyContainsScript) {
      body.appendChild(script);
    }
  }

  // geocode(address) {
  //   return Observable.create(observer => {
  //     this.http.geoLatLngFromAddress(address).subscribe(res => {
  //       if (res && res.status === 'OK') {
  //         if (res.results && res.results.length > 0) {
  //           observer.next(res.results[0].geometry.location);
  //           observer.complete();
  //         }
  //       }
  //     });
  //   });
  // }
  // reverseGeocode(latitude, longitude) {
  //   return Observable.create(observer => {
  //     this.http.geoAddressFromLatLng(latitude, longitude).subscribe(res => {
  //       if (res && res.status === 'OK') {
  //         if (res.results && res.results.length > 0) {
  //           observer.next(res.results[0].formatted_address.charAt(0).toUpperCase() +
  //             res.results[0].formatted_address.slice(1).toLowerCase());
  //           observer.complete();
  //         }
  //       }
  //     });
  //   });
  // }
  getAddressSuggestions(address) {
    console.log('get', address);



    address = address.replace(/ /g, '+');

    return this.http.get<any>(`http://localhost:3000/getLocations`
      , { params: { address } })
      .pipe(map((res: any) => {
          return res.data;
      }));
  }
}
