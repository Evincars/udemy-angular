import { AbstractControl } from '@angular/forms';

export class MathValidators {
  // for using funciton as a reference, like [MathValidators.addition]
  // in validators array in FormGroup
  static additionRef(form: AbstractControl) {
    const { a, b, answer } = form.value;
    if (a + b === parseInt(answer)) {
      return null; // everything is ok -> return null
    }
    // returning custom object
    return { addition: true };
  }

  // implementation of validator, which needs to pass some params into it
  // - function with returns a reference into another function
  // - in custom validation, we need to pass function reference in FormGroup
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];

      if (firstNumber + secondNumber === parseInt(sum)) {
        return null; // everything is ok -> return null
      }
      // returning custom object
      return { addition: true };
    };
  }
}
