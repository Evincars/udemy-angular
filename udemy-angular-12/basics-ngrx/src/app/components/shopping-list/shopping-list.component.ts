import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { State } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  /*
  Before Services were used

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 3),
  ];*/

  ingredients!: Observable<{ingredients?: Ingredient[], payload?: Ingredient[]}>;
  // ingredientsSub?: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[], payload?: Ingredient[]}}>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditting.next(index);
  }

  ngOnDestroy() {
    // this.ingredientsSub?.unsubscribe();
  }

  /*
  Before Service were used

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }*/
}
