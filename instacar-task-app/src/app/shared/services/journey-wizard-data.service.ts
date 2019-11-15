import { DriverDetails, JourneyDetails, JourneyData } from './../models/JourneyWizard';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JourneyWizardDataService {

  availableDriver: DriverDetails[] = [];
  tripDetails: JourneyDetails;
  selectedDriver: DriverDetails;
  finalReciept: JourneyData;
  paymentAmount: number;

  constructor() { }

  availaibleDrivers(drivers: DriverDetails[]) {
    this.availableDriver = drivers;
  }

  currentTripDetails(tripDetails: JourneyDetails) {
    this.tripDetails = tripDetails;
  }

  currentDriver(driverDetails: DriverDetails) {
    this.selectedDriver = driverDetails;
  }

  setFinalJourneyDetails(journeyData: JourneyData) {
    this.finalReciept = journeyData;
    this.paymentAmount = journeyData.driverDetails.calculatedFare;
  }
}
