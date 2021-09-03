import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  // previously we were using EventEmitter, but using Subject
  // is strongly recommended
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 3),
  ];

  constructor() {}

  public getIngredients() {
    return this.ingredients.slice(); // copy of array, otherwise it'd return direct reference
  }

  public addIngredient(ingredients: Ingredient[] | undefined) {
    if (ingredients) {
      this.ingredients.push(...ingredients);
    }

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
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
