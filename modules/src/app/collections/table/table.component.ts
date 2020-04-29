import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public vmHeaders: Array<any> = [];
  public headerKeys: Array<string> = [];

  @Input() set headers(v: any) {
    this.vmHeaders = v;
    this.vmHeaders.forEach(o => {
      this.headerKeys.push(o.key);
    });
  }
  @Input() data: Array<Object>;

  constructor() {}

  ngOnInit() {}
}
