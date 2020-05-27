import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchPhotoService {
  private ACCESS_KEY = '_f44t5ZcHDHieSopJ7n-lEQh2yqJ3SrR02ar6-UihRo';
  // https://api.unsplash.com/photos/?client_id=_f44t5ZcHDHieSopJ7n-lEQh2yqJ3SrR02ar6-UihRo
  constructor(private http: HttpClient) {}

  fetch() {
    return this.http
      .get('https://api.unsplash.com/photos/random', {
        headers: {
          'Accept-Version': 'v1',
          Authorization: 'Client-ID ' + this.ACCESS_KEY,
        },
      })
      .pipe<string>(pluck('urls', 'regular'));
  }
}
