import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 3),
  ];

  constructor() {}

  public getIngredients() {
    return this.ingredients.slice(); // copy of array, otherwise it'd return direct reference
  }

  public addIngredient(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);

    // TODO
    const groupedShoppingList = _.groupBy(
      this.ingredients,
      // (ingredient: Ingredient) => {
      //   ingredient.name;
      // }
      'name'
    );
    // console.log(groupedShoppingList);

    // because in getIngredients() we're returning an copy of array, components cannot recognize
    // if values in original reference array were changed so we have to emit an event
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
