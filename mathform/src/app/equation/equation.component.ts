import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );
  constructor() {}

  get A() {
    return this.mathForm.value.a;
  }

  get B() {
    return this.mathForm.value.b;
  }
  ngOnInit() {
    // const startTime = new Date();
    // let numberSolved = 0;

    this.mathForm.statusChanges
      .pipe(
        filter((v) => v === 'VALID'),
        delay(300),
        scan(
          (accumulator, value) => {
            return {
              numberSolved: accumulator.numberSolved + 1,
              startTime: accumulator.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        // if (v === 'INVALID') { // already filtered in .filter(...) operator
        //   return;
        // }

        // numberSolved++; // solved by .scan(...) operator
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        // one option how to update values:
        // this.mathForm.controls.a.setValue(this.randomNumber());
        // this.mathForm.controls.b.setValue(this.randomNumber());
        // this.mathForm.controls.answer.setValue('');

        // second option how to update values:
        // only for updating all values in the form
        // - for updating particular values: use .patchValue({...})
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
