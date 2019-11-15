import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JourneyWizardDataService } from '../../services/journey-wizard-data.service';

// tslint:disable-next-line: no-unused-expression
declare var Frames: any;

@Component({
  selector: 'it-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  payButton: any;
  form: any;


  _paymentForm: FormGroup;
  validTill: any;
  transactionAmount: number;

  constructor(
    private _fb: FormBuilder,
    private _sharedDataJS: JourneyWizardDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.transactionAmount = this._sharedDataJS.paymentAmount;
    if (!this.transactionAmount) {
      // this.router.navigateByUrl('/s1');
    }
    this.initForms();
  }

  initForms() {
    this.payButton = document.getElementById("pay-button");
    this.form = document.getElementById("payment-form");

    const { payButton, form } = this;

    Frames.init({
      publicKey: "pk_test_ea63f954-ed56-4d25-8881-c8d02c3f1d7f"
    });

    this._paymentForm = this._fb.group({
      cvv: new FormControl(null, [Validators.required]),
      cardNumber: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(null, [Validators.maxLength(4)]),
      nameOnCard: new FormControl(`Abhishek Mittal`, [])
    });

    Frames.addEventHandler(
      Frames.Events.CARD_VALIDATION_CHANGED,
      function (event) {
        console.log("CARD_VALIDATION_CHANGED: %o", event);

        payButton.disabled = !Frames.isCardValid();
      }
    );

    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZED,
      function (event) {
        var el = document.querySelector(".success-payment-message");
        el.innerHTML = "Card tokenization completed<br>" +
          "Your card token is: <span class=\"token\">" + event.token + "</span>";
      }
    );

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      Frames.submitCard();
    });
  }

  // _validTill(v) {
  //   if (v.which === 8) {
  //     return;
  //   }

  //   const val = v.target.value;
  //   // if (val.length > 2) { return; }
  //   let vString = '' + val;
  //   if (isNaN(+vString) && vString.length >= 7) {
  //     console.log('aa:: ', v, val.length);
  //     vString = isNaN(+vString) ? '' : vString.match(/(\d{0,2})/g)[0];
  //     console.log('aa:: ', vString);
  //   }
  //   if (vString.length >= 2 && vString.length <= 4) {
  //     vString += ' / '
  //   }
  //   this._paymentForm.controls['expiryDate'].setValue(vString);
  // }

}
