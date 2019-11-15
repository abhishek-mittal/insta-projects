import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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


  paymentForm: FormGroup;
  validTill: any;
  transactionAmount: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sharedDataJS: JourneyWizardDataService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.transactionAmount = this.sharedDataJS.paymentAmount;
    if (!this.transactionAmount) {
      this.router.navigateByUrl('/s1');
    }
    this.initForms();
  }

  initForms() {
    this.payButton = document.getElementById('pay-button');
    this.form = document.getElementById('payment-form');

    const { payButton, form } = this;

    Frames.init({
      publicKey: 'pk_test_ea63f954-ed56-4d25-8881-c8d02c3f1d7f'
    });

    this.paymentForm = this.fb.group({
      cvv: new FormControl(null, [Validators.required]),
      cardNumber: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(null, [Validators.maxLength(4)]),
      nameOnCard: new FormControl(`Abhishek Mittal`, [])
    });

    Frames.addEventHandler(
      Frames.Events.CARD_VALIDATION_CHANGED,
      (event) => {
        console.log('CARD_VALIDATION_CHANGED: %o', event);
        payButton.disabled = !Frames.isCardValid();
      }
    );

    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZED,
      (event) => {
        this.http.post(`${environment.apiUrl}/payment`, { card_token: event.token, amount: this.transactionAmount }).subscribe((res: any) => {
          console.log(res);
          const el = document.querySelector('.success-payment-message');
          if(res.success) {
            setTimeout(() => {
              this.ngZone.run( () => this.router.navigateByUrl('/s1'));
            }, 600);
          }
          el.innerHTML = '<span style="color:green"><b>Payment Successful</b></span>';
        });
      }
    );

    form.addEventListener('submit', (event) => {
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
