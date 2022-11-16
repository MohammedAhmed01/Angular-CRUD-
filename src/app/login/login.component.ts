import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { GlobalComponent } from '../global-componenet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LogInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthGuard
  ) {}

  //Form and validators
  ngOnInit(): void {
    this.LogInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
    if (GlobalComponent.LoggedInStatus) {
      this.router.navigate(['employee']);
    }
  }
  //Its check the user enter details with json-server and then it allows to dashboard page
  submitLogInForm() {
    this.http.get<any>('http://localhost:3000/signUp').subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.email === this.LogInForm.value.email &&
          a.password === this.LogInForm.value.password
        );
      });
      if (user) {
        this.auth.guard = true;
        localStorage.setItem('user', JSON.stringify(user));
        this.LogInForm.reset();
        this.router.navigate(['employee']);
        window.location.reload();
      } else {
        alert('user not found');
        this.router.navigate(['login']);
      }
    });
  }

  get email() {
    return this.LogInForm.get('email');
  }

  //It navaigate to signup page
  createAccount() {
    this.router.navigate(['signup']);
  }
}
