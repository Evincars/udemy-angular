import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      MathValidators.addition('answer', 'a', 'b'),
    ]
  );
  constructor() {}

  get A() {
    return this.mathForm.value.a;
  }

  get B() {
    return this.mathForm.value.b;
  }
  ngOnInit() {}

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
