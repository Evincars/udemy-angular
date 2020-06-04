import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  // NgControl will automatically "connect" directive with
  // #formControlName -> defined in HTML where form is located
  // through that, we can connect parent -> which is FormGroup
  constructor(private el: ElementRef, private controlName: NgControl) {}

  ngOnInit() {
    // accessing to FormGroup as a parent through FormControlName
    this.controlName.control.parent.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))))
      .subscribe((v) => {
        if (v < 0.2) {
          this.el.nativeElement.classList.add('highlight');
        } else {
          this.el.nativeElement.classList.remove('highlight');
        }
      });
  }
}
