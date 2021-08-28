import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) ingredientName?: ElementRef;
  @ViewChild('amountInput', { static: false }) ingredientAmount?: ElementRef;
  @Output('onIngredientAdded') newIngredient = new EventEmitter<Ingredient>();

  errorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient() {
    const name = this.ingredientName?.nativeElement.value;
    const amount = this.ingredientAmount?.nativeElement.value;

    if (!name || !amount || this.ingredientAmount?.nativeElement.value <= 0) {
      this.errorMessage = 'You have to fill in ingredient name and amount with correct values.';
      return;
    }
    this.errorMessage = '';
    this.newIngredient.emit(new Ingredient(name, amount));
  }
}
