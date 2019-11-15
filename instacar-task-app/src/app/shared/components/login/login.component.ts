import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'it-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _loginForm: FormGroup;
  hide = true;

  constructor(
    private _fb: FormBuilder,
    private _authS: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this._loginForm = this._fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage() {
    if (this._loginForm && this._loginForm.controls.email) {
      return this._loginForm.controls.email.hasError('required') ? 'You must enter a value' :
          this._loginForm.controls.email.hasError('email') ? 'Not a valid email' :
              '';
    }
    return '';
  }

  submitRequest() {
    const userCredentials = this._loginForm.getRawValue();
    this._authS.loginUser(userCredentials).subscribe((state: any) => {
      console.log(state);
      if (state === 'USER_LOGGED_IN') {
        const lastRoute = localStorage.getItem('lastActiveRoute') || '/s3';
        this.router.navigateByUrl(lastRoute);
      }
    });
  }

}
