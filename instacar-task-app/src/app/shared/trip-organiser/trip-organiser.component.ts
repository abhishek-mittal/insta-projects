import { JourneyWizardDataService } from './../services/journey-wizard-data.service';
import { ItHttpService } from './../services/it-http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { map, startWith, concatMap } from 'rxjs/operators'
import { GAPIService } from '../services/g-api.service';
import { Router } from '@angular/router';

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
  _tripForm: FormGroup;
  filteredStates: any;
  todayDate = new Date();
  fromDate = new Date();
  filteredDepStates: any;

  defaultLocation = {
    description: 'Banglore'
  }

  constructor(
    private _fb: FormBuilder,
    private _gAPI: GAPIService,
    public _itS: ItHttpService,
    private _sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this._tripForm = this._fb.group({
      goingTo: new FormControl('', [Validators.required]),
      departFrom: new FormControl({ value: 'Banglore', disabled: true }, [Validators.required]),
      departDate: new FormControl(`${new Date().toUTCString()}`, []),
      returnDate: new FormControl(`${new Date().toUTCString()}`, []),
      journeyType: new FormControl(`ONE_WAY`, [])
    });

    this._tripForm.controls['departDate'].valueChanges
      .subscribe(console.log);
  }

  setTripType(type = 'ONE_WAY') {
    this._tripForm.controls['journeyType'].setValue(type);
    return false;
  }

  getfilterStates(value: string) {
    const filterValue = value.toLowerCase();
    this._gAPI.getAddressSuggestions(filterValue).subscribe( res => {
      console.log(res);

      this.filteredStates = res;
    });
    // });
  }

  dateChanged(e) {
    this.fromDate = new Date(e.target.value);
    const nextDay = new Date(e.target.value)
    nextDay.setDate(this.fromDate.getDate()+1)
    if (this.fromDate >= this._tripForm.controls['returnDate'].value) {
      this._tripForm.controls['returnDate'].setValue(nextDay);
    }
  }

  submitJourneyDetails() {

    console.log(this._tripForm.getRawValue())
    this._itS.availableDrivers(this._tripForm.getRawValue()).subscribe( e => {
      console.log(e);
      this._sharedDataJS.availaibleDrivers(e);
      this.router.navigateByUrl('/s2');
    });
  }

}
