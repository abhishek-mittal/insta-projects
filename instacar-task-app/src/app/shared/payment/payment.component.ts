import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'it-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  _paymentForm: FormGroup;
  validTill: any;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this._paymentForm = this._fb.group({
      cvv: new FormControl(null, [Validators.required]),
      cardNumber: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(null, [Validators.maxLength(4)]),
      nameOnCard: new FormControl(`Abhishek Mittal`, []),
      transactionAmount: new FormControl(`50`, [])
    });
  }

  _validTill(v) {
    if (v.which === 8) {
      return;
    }

    const val = v.target.value;
    // if (val.length > 2) { return; }
    let vString = '' + val;
    if (isNaN(+vString) && vString.length >= 7) {
      console.log('aa:: ', v, val.length);
      vString = isNaN(+vString) ? '' : vString.match(/(\d{0,2})/g)[0];
      console.log('aa:: ', vString);
    }
    if (vString.length >= 2 && vString.length <= 4) {
      vString += ' / '
    }
    this._paymentForm.controls['expiryDate'].setValue(vString);
  }

}
