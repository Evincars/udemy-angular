import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  // trigger some info and send it back to parent => child to parent communication
  @Output() submitted = new EventEmitter<string>();
  term = '';

  constructor() {}

  onFormSubmit(event: any) {
    // stop default behavior of browser - means that form won't be submitted and inputs won't be cleared
    event.preventDefault();
    console.log('Child component input: ', this.term);
    this.submitted.emit(this.term);
  }

  ngOnInit() {}
}
