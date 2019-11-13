import { Component, OnInit } from '@angular/core';

export type Langauages = 'HINDI' | 'ENGLISH' | 'KANNADA';

export interface DriverDetails {
  languages: Array<Langauages>;
  fullName: string;
  withUs?: string;
}

export interface Convininence {
  cType: 'CAR';
  cPrice: number;
  cDriverDetails: DriverDetails
}

@Component({
  selector: 'it-convenience-options',
  templateUrl: './convenience-options.component.html',
  styleUrls: ['./convenience-options.component.scss']
})
export class ConvenienceOptionsComponent implements OnInit {

  conviniences: Convininence[];
  filters = {
    languages: ['HINDI', 'ENGLISH', 'KANNADA']
  }

  constructor() { }

  ngOnInit() {
    this.initConvinience();
  }

  initConvinience() {
    this.conviniences = [
      { cType: 'CAR', cPrice: 500, cDriverDetails: {languages: ['ENGLISH', 'HINDI'], fullName: 'XYZ Singh Khan'} },
      { cType: 'CAR', cPrice: 1500, cDriverDetails: {languages: ['ENGLISH', 'HINDI'], fullName: 'XYZ Singh Khan 1'} },
      { cType: 'CAR', cPrice: 5000, cDriverDetails: {languages: ['ENGLISH', 'HINDI'], fullName: 'XYZ Singh Khan 2'} }
    ]
  }

}
