import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'

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

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  filteredDepStates: any;

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this._tripForm = this._fb.group({
      goingTo: new FormControl({value: 'Banglore', disabled: true}, [Validators.required]),
      departFrom: new FormControl('', [Validators.required]),
      departDate: new FormControl(`${new Date().toUTCString()}`, []),
      returnDate: new FormControl(`${new Date().toUTCString()}`, []),
      journeyType: new FormControl(`ONE_WAY`, [])
    });

    this.filteredStates = this._tripForm.controls['departFrom'].valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
    );
  }

  call(type?) {
    console.log('selected', type);
    return false;
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
