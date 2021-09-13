import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiKey = 'AIzaSyD0svdSF9uPJnDaYaXoi8wL6H1Df-s_v58';
  private readonly signUpEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.apiKey;
  private readonly signInEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.apiKey;

  public static errorMessages: { [key: string]: string } = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND:
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD:
      'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
  };

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInEndpoint, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpEndpoint, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.log(res);

    if (res.error || res.error.error) {
      // with this.errorMessages{...} we will access to this scope of the callback
      // hence it won't work, so static must be used
      return throwError(AuthService.errorMessages[res.error.error.message]);
    }
    return throwError('An unknown error occured.');
  }
}
