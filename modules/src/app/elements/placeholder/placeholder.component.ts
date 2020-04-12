import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent implements OnInit {
  @Input() header: boolean = true;
  @Input() lines: number = 3;

  constructor() {}

  ngOnInit() {}
}
