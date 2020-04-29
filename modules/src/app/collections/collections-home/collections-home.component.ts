import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections-home',
  templateUrl: './collections-home.component.html',
  styleUrls: ['./collections-home.component.scss'],
})
export class CollectionsHomeComponent implements OnInit {
  public data: Array<Object> = [
    { name: 'Adam', age: 23, job: 'Programmer' },
    { name: 'Pepa', age: 24, job: 'Networker' },
    { name: 'Jirka', age: 25, job: 'Engineer' },
  ];

  public headers: Array<any> = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'job', label: 'Job' },
  ];

  constructor() {}

  ngOnInit() {}
}
