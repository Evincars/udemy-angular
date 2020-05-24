import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  // https://owasp.org/www-community/xss-filter-evasion-cheatsheet
  @Input() pages = [];
  displayedColumns: string[] = ['title', 'wordcount', 'snippet'];
  constructor() {}

  ngOnInit() {}
}
