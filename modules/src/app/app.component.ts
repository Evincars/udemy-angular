import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public navLinks = [
    { path: '/elements', label: 'Elements' },
    { path: '/collections', label: 'Collections' },
    { path: '/views', label: 'Views' },
    { path: '/mods', label: 'Modules' },
  ];
}
