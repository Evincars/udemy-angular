import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-views-home',
  templateUrl: './views-home.component.html',
  styleUrls: ['./views-home.component.scss'],
})
export class ViewsHomeComponent implements OnInit {
  public stats: Array<Object> = [
    { value: 22, label: 'Label 1' },
    { value: 234, label: 'Label 2' },
    { value: 31, label: 'Label 3' },
  ];

  public items: Array<Object> = [
    {
      image: 'assets/images/couch.jpeg',
      header: 'Header 1',
      text: 'some random text',
    },
    {
      image: 'assets/images/dresser.jpeg',
      header: 'Header 2',
      text: 'some random text',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
