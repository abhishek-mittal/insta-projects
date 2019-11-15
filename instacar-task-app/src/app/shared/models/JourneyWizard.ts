import { User } from './user';
export type Langauages = 'HINDI' | 'ENGLISH' | 'KANNADA';

export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface DriverDetails {
  availableLocations: string;
  calculatedFare: number;
  driverPricePerKM: number;
  email: string;
  fullName: string;
  language: Array<Langauages>;
  phone: string;
  withUs?: string;
}


export interface Convininence {

  cType: 'CAR';
  cPrice: number;
  cDriverDetails: DriverDetails;
}

export enum TRIP_TYPE {
  one_way = 'ONE_WAY',
  round_trip = 'ROUND_TRIP',
  multi_city = 'MULTI_CITY'
}

export interface TRANSACTION {
  customer: any;
  assignedDriver: DriverDetails;
  payment: Convininence;
}

export interface JourneyDetails {
  goingTo: string;
  departFrom: string;
  departDate: Date;
  returnDate: Date;
  journeyType: TRIP_TYPE;
}

export interface ExtraDetails {
  pickupTime: Date;
  prickupAddress: string;
}

export class JourneyData {


  userDetails: User;
  journeyDetails: JourneyDetails;
  driverDetails: DriverDetails;
  transaction: TRANSACTION;
  extraDetails: ExtraDetails;

  constructor(journeyDetails: JourneyDetails, driverDetails: DriverDetails) {
    this.journeyDetails = journeyDetails;
    this.driverDetails = driverDetails;
    this.userDetails = JSON.parse(localStorage.getItem('profile'));
  }

  setExtraDetails(ed: ExtraDetails) {
    this.extraDetails = ed;
  }



}
