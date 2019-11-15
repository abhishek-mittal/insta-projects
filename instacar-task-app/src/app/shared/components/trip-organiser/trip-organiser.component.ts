import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourneyDetails, TRIP_TYPE } from '../../models/JourneyWizard';
import { GAPIService } from '../../services/g-api.service';
import { ItHttpService } from '../../services/it-http.service';
import { JourneyWizardDataService } from '../../services/journey-wizard-data.service';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'it-trip-organiser',
  templateUrl: './trip-organiser.component.html',
  styleUrls: ['./trip-organiser.component.scss']
})
export class TripOrganiserComponent implements OnInit {
  tripForm: FormGroup;
  filteredStates: any;
  todayDate = new Date();
  fromDate = new Date();
  filteredDepStates: any;
  selectedTrip: TRIP_TYPE;
  tripWarningElem: HTMLElement;

  defaultLocation = {
    description: 'Banglore'
  };

  constructor(
    private fb: FormBuilder,
    private gAPI: GAPIService,
    public itS: ItHttpService,
    private sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) {
    this.setDefaults();
  }

  ngOnInit() {
    this.initForms();
    if (this.sharedDataJS.tripDetails) {
      this.initForms(this.sharedDataJS.tripDetails);
    }
    this.tripWarningElem = document.querySelector('#roundTripWarning');
  }

  setDefaults() {
    this.selectedTrip = TRIP_TYPE.one_way;
  }

  initForms(predefinedValues?: JourneyDetails) {

    const { goingTo, departFrom, departDate, returnDate, journeyType } = (predefinedValues || {}) as JourneyDetails;

    this.tripForm = this.fb.group({
      goingTo: new FormControl(goingTo || '', [Validators.required]),
      departFrom: new FormControl({ value: 'Banglore', disabled: true }, [Validators.required]),
      departDate: new FormControl(departDate || null, [Validators.required]),
      returnDate: new FormControl(returnDate || null, []),
      journeyType: new FormControl(`ONE_WAY`, [])
    });

    // tslint:disable:no-string-literal
    this.tripForm.controls['departDate'].valueChanges
      .subscribe(console.log);
  }

  setTripType(type = TRIP_TYPE.one_way) {
    if (type === TRIP_TYPE.one_way) {
      this.tripWarningElem.innerHTML = '';
      this.tripForm.controls['returnDate'].setValidators(Validators.required);
    } else {
      this.tripForm.controls['returnDate'].clearValidators();
    }
    this.tripForm.controls['journeyType'].setValue(type);
    this.selectedTrip = type;
    return false;
  }

  getfilterStates(value: string) {
    const filterValue = value.toLowerCase();
    this.gAPI.getAddressSuggestions(filterValue).subscribe(res => {
      this.filteredStates = res;
    });
  }

  dateChanged(e) {
    this.fromDate = new Date(e.target.value);
    const nextDay = new Date(e.target.value);
    nextDay.setDate(this.fromDate.getDate() + 1);
    if (this.tripForm.controls['returnDate'].value && (this.fromDate > this.tripForm.controls['returnDate'].value)) {
      this.tripForm.controls['returnDate'].setValue(nextDay);
    }
  }

  submitJourneyDetails() {
    const tripDetails = this.tripForm.getRawValue();
    this.sharedDataJS.currentTripDetails(tripDetails);
    this.itS.availableDrivers(tripDetails).subscribe((res) => {
      if (!res.status && (res.error || {}).message === 'REDIRECT_TO_ROUND_TRIP') {
        this.tripWarningElem.innerHTML = 'Sorry we can provide only round trip for more than 50 Kms';
        this.setTripType(TRIP_TYPE.round_trip);
      } else {
        this.sharedDataJS.availaibleDrivers(res.data);
        this.router.navigateByUrl('/s2');
      }
    });
  }

}
