import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*
  Before routing was used

  @Output() featureSelected = new EventEmitter<string>();*/

  constructor() { }

  ngOnInit(): void { }

  /*
  Before routing was used

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/

}
