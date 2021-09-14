import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInMode = true;
  isLoading = false;

  authForm!: FormGroup;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    this.error = '';
    this.isLoading = true;
    const authObs: Observable<AuthResponseData> = this.createAuthObservable();

    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        this.authForm.reset();
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.authForm.reset();
      }
    );
  }

  private createAuthObservable() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    const authObs: Observable<AuthResponseData> = this.isSignInMode
      ? this.authService.signIn(email, password)
      : this.authService.signUp(email, password);
    return authObs;
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
