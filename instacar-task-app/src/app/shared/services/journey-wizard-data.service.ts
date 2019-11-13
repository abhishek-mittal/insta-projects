import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JourneyWizardDataService {

  availableDriver = [];

  constructor() { }

  availaibleDrivers(drivers: Array<any>) {
    this.availableDriver = drivers;
  }
}
