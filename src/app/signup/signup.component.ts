import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global-componenet';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  namePattern = /^[a-z]{5,15}$/;
  mobilePattern = /^[789]\d{9}$/;
  emailPattern = /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/;
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  //Reative signup form and validdators
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.namePattern),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.mobilePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.minLength(8)],
        Validators.pattern(this.emailPattern),
      ],
      password: ['', [Validators.required]],
    });

    if (GlobalComponent.LoggedInStatus) {
      this.router.navigate(['employee']);
    }
    GlobalComponent.LoggedInStatus = false;
    if (GlobalComponent.LoggedInStatus) {
      this.router.navigate(['employee']);
    }
  }

  //Signup form and navigate to login page after signup completed
  submitSignUpForm() {
    this.http
      .post('http://localhost:3000/signUp', this.signUpForm.value)
      .subscribe(() => {
        this.signUpForm.reset();
        this.router.navigate(['login']);
        alert('SignUp Successfull!!');
      });
  }

  //Getters of form
  get name() {
    return this.signUpForm.get('name');
  }
  get mobile() {
    return this.signUpForm.get('mobile');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  //It navigates to login page
  logIn() {
    this.router.navigate(['login']);
    GlobalComponent.LoggedInStatus = false;
    if (GlobalComponent.LoggedInStatus) {
      this.router.navigate(['employee']);
    }
  }
}
