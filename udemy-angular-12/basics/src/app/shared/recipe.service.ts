import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Meat tali',
      'Curabitur vitae diam non enim vestibulum interdum.',
      'https://malaindia.cz/wp-content/uploads/2019/06/foods-with-dal-in-middle_edited-and-cropped-900x667.jpg',
      [new Ingredient('black spice', 1), new Ingredient('Kurkuma', 2)]
    ),
    new Recipe(
      'Veg tali with Kurkuma',
      'Phasellus faucibus molestie nisl.',
      'https://static.toiimg.com/photo/65489383.cms?imgsize=605279',
      [new Ingredient('green spice', 2), new Ingredient('Kurkuma', 1)]
    ),
    new Recipe(
      'Massala tali',
      'Fusce suscipit libero eget elit. Integer malesuada',
      'https://static.toiimg.com/photo/74984407.cms',
      [new Ingredient('black spice', 5), new Ingredient('Tikka Massala', 4)]
    ),
    new Recipe(
      'Kari tali',
      'Nulla accumsan, elit sit amet varius semper.',
      'https://i1.wp.com/www.dailycal.org/assets/uploads/2019/10/food_Allison-Fong_staff2.jpeg?ssl=1&w=900',
      [new Ingredient('yellow spice + Kari', 3)]
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  public getRecipes() {
    // return this.recipes; // !! this will return direct reference to the service array !!
    return this.recipes.slice(); // ...hence we have to return a copy of the service array
  }
}
