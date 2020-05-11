import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onTerm(term: string) {
    console.log('Parent component which handle info from child: ', term);
  }
}
