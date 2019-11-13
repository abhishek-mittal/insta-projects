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
  round_trip = 'ONE_WAY',
  multi_city = 'ONE_WAY'
}

export interface TRANSACTION {
  customer: any;
  assignedDriver: DriverDetails;
  payment: Convininence;
}


export class JourneyData {

  goingTo: string;
  departFrom: string;
  departDate: Date;
  returnDate: Date;
  journeyType: TRIP_TYPE;
  transaction: TRANSACTION;



}
