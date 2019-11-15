import { ExtraDetails } from './../../models/JourneyWizard';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JourneyData } from '../../models/JourneyWizard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JourneyWizardDataService } from '../../services/journey-wizard-data.service';

@Component({
  selector: 'it-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrls: ['./trip-summary.component.scss']
})
export class TripSummaryComponent implements OnInit {
  journeySummary: JourneyData;
  pickupTime: FormControl;
  pickupAddress: FormControl;


  constructor(
    private _sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initAllSummaryDetails();
  }

  initAllSummaryDetails() {

    if (!(this._sharedDataJS.availableDriver.length && this._sharedDataJS.tripDetails) ) {
      // first page 1 will load if no data is available
      return (!this._sharedDataJS.tripDetails && this.router.navigateByUrl('/s1'))
      || (!this._sharedDataJS.selectedDriver && this.router.navigateByUrl('/s2'));
    }

    this.journeySummary = new JourneyData(this._sharedDataJS.tripDetails, this._sharedDataJS.selectedDriver);
    // tslint:disable-next-line: max-line-length
    const {pickupTime: pT, prickupAddress: pA} = (this._sharedDataJS.finalReciept && this._sharedDataJS.finalReciept.extraDetails || {}) as ExtraDetails;
    this.pickupTime = new FormControl(pT || '10AM', [Validators.required]);
    this.pickupAddress = new FormControl(pA, [Validators.required]);
    console.log(this.journeySummary);

  }
  callForPayment() {
    if(this.pickupTime.valid && this.pickupAddress.valid) {
      const extradetails = {
        pickupTime: this.pickupTime.value,
        prickupAddress: this.pickupAddress.value
      };
      this.journeySummary.setExtraDetails(extradetails);
      this._sharedDataJS.setFinalJourneyDetails(this.journeySummary);
      this.router.navigateByUrl('/auth/payment');
      return;
    }
    console.log(this.pickupTime.value , this.pickupAddress.value);
  }

}
