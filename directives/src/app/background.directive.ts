import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appBackground]",
})
export class BackgroundDirective {

  constructor(private element: ElementRef) {
    // in this time, bgColor is undefined, because it's inside the constructor
    // and we're setting up bgColor after calling directive in HTML
    this.element.nativeElement.style.backgroundColor = this.bgColor;
  }
  
  // string in @input is for:
  // we don't need to use this syntax <div appBackground [bgColor]="'gray'"
  // but just use [appBackground]="'gray'"
  @Input('appBackground') public set bgColor(color : string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
  
}
