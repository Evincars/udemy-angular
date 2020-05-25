import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[]; // annotation for Array of Objects
  };
}

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space
  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http
      .get<WikipediaResponse>(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          utf8: '1',
          srsearch: term,
          origin: '*', // because we're using JS code to pass params into URL, we have to define origin prop
        },
      })
      .pipe(pluck('query', 'search'));
  }
}
