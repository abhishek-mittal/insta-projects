import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Convininence } from '../models/JourneyWizard';
import { JourneyWizardDataService } from '../services/journey-wizard-data.service';



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

  constructor(
    private _sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initConvinience();
  }

  initConvinience() {

    this.conviniences = this._sharedDataJS.availableDriver.map( d => ({ cType: 'CAR', cDriverDetails: d }) ) as Convininence[];
    if (!this.conviniences.length) {
      this.router.navigateByUrl('/s1');
    }
  }

}
