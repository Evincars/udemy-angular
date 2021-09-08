import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Meat tali',
      'Curabitur vitae diam non enim vestibulum interdum.',
      'https://malaindia.cz/wp-content/uploads/2019/06/foods-with-dal-in-middle_edited-and-cropped-900x667.jpg',
      [new Ingredient('black spice', 1), new Ingredient('Kurkuma', 2)]
    ),
    new Recipe(
      2,
      'Veg tali with Kurkuma',
      'Phasellus faucibus molestie nisl.',
      'https://static.toiimg.com/photo/65489383.cms?imgsize=605279',
      [new Ingredient('green spice', 2), new Ingredient('Kurkuma', 1)]
    ),
    new Recipe(
      3,
      'Massala tali',
      'Fusce suscipit libero eget elit. Integer malesuada',
      'https://static.toiimg.com/photo/74984407.cms',
      [new Ingredient('black spice', 5), new Ingredient('Tikka Massala', 4)]
    ),
    new Recipe(
      4,
      'Kari tali',
      'Nulla accumsan, elit sit amet varius semper.',
      'https://i1.wp.com/www.dailycal.org/assets/uploads/2019/10/food_Allison-Fong_staff2.jpeg?ssl=1&w=900',
      [new Ingredient('yellow spice + Kari', 3)]
    ),
  ];

  // previously we were using EventEmitter, but using Subject
  // is strongly recommended
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor() {}

  public getRecipes() {
    // return this.recipes; // !! this will return direct reference to the service array !!
    return this.recipes.slice(); // ...hence we have to return a copy of the service array
  }

  public getRecipe(id: number): Recipe | undefined {
    const itemCopy: Recipe | undefined = this.findRecipe(id);
    return itemCopy ? { ...itemCopy } : undefined;
  }

  public removeRecipe(id: number | undefined) {
    const itemCopy: Recipe | undefined = this.findRecipe(id);
    if (confirm(`Do You want to delete '${itemCopy?.name}' recipe?`)) {
      this.recipes = this.recipes.filter((o: Recipe) => {
        return o.id !== id;
      });
      this.emitChange();
    }
  }

  public editRecipe(recipe: Recipe) {
    const index = _.findIndex(this.recipes, { id: recipe.id });
    this.recipes.splice(index, 1, recipe);
    this.emitChange();
  }

  public addRecipe(recipe: Recipe) {
    const maxValue = _.maxBy(this.recipes, 'id')?.id;
    if (maxValue !== undefined) {
      recipe.id = maxValue + 1;
      this.recipes.push(recipe);
    }
  }

  public removeIngredient(recipe: Recipe) {
    this.editRecipe(recipe);
  }

  private findRecipe(id: number | undefined): Recipe | undefined {
    return this.recipes.find((o: Recipe) => {
      return o.id == id;
    });
  }

  private emitChange() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
