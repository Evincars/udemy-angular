import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mods-home',
  templateUrl: './mods-home.component.html',
  styleUrls: ['./mods-home.component.scss']
})
export class ModsHomeComponent implements OnInit {

  constructor() { }

  // called *once* after this component is first displayed on the screen
  // and after Angular has set any properties passed down from parent component
  ngOnInit() {
  }

  // called *once* when Angular is about to remove this component (for example, 
  // when we navigate to a different route!) 
  ngOnDestroy() {
  }

  // called anytime a property of the component is changed (including when a
  // parent component passes down new data)
   ngOnChanges() {
  }

}
