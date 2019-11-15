import { Langauages } from './../../models/JourneyWizard';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Convininence, DriverDetails } from '../../models/JourneyWizard';
import { JourneyWizardDataService } from '../../services/journey-wizard-data.service';



@Component({
  selector: 'it-convenience-options',
  templateUrl: './convenience-options.component.html',
  styleUrls: ['./convenience-options.component.scss']
})
export class ConvenienceOptionsComponent implements OnInit {

  availableDrivers: DriverDetails[];
  _availableDrivers: DriverDetails[];
  filters = {
    languages: ['','HINDI', 'ENGLISH', 'KANNADA']
  };
  selectedDriver: any;
  selectedLanguage: string;


  constructor(
    private _sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initConvinience();
  }

  initConvinience() {

    if(this._sharedDataJS.selectedDriver) {
     this.selectedDriver = this._sharedDataJS.selectedDriver;
    }

    this._availableDrivers = this._sharedDataJS.availableDriver;
    this.availableDrivers = this._sharedDataJS.availableDriver;
    if (!this.availableDrivers.length) {
      this.router.navigateByUrl('/s1');
    }
  }

  proceedToSummary() {
    console.log(this.selectedDriver);
    if (this.selectedDriver) {
      this._sharedDataJS.currentDriver(this.selectedDriver);
      this.router.navigateByUrl('/s3');
    } else {
      alert('please select driver.');
    }
  }

  filterDrivers() {
    this.availableDrivers = this._availableDrivers.filter( v => (!this.selectedLanguage
      || v.language.includes(this.selectedLanguage.toLowerCase() as Langauages)));
    console.log(this.availableDrivers, this._availableDrivers);
  }
}
