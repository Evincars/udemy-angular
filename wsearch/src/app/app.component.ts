import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pages = [];
  // instance of each service/class/method which is injected through DI is created only once !!
  // DI is useful for testing -> we're able to mock some service, otherwise if service is using
  // API requests, each test would run API and that is time consuming
  constructor(private wikipedia: WikipediaService) {}

  onTerm(term: string) {
    console.log('Parent component which handle info from child: ', term);

    const results = this.wikipedia.search(term).subscribe((response) => {
      this.pages = response;
    });

    console.log(`results: ${results}`);
  }
}
