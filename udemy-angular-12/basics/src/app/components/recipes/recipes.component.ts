import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

  // NOT NEEDED, in RecipeService, we're setting up ProvidedIn: 'root'
  // same as we'd push it to providers[] array in app.module
  
  // providers: [RecipeService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  recipeSub?: Subscription;

  constructor(private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.recipeSub = this.recipeService.recipeSelected.subscribe((selectedRecipe: Recipe) => {
      this.recipe = selectedRecipe;
    });
  }
  
  ngOnDestroy(): void {
    this.recipeSub?.unsubscribe();
  }

  /*
  Before Services were used

  detailOfSelectedItem(selectedItem: Recipe) {
    console.log(selectedItem);
    this.recipe = selectedItem;
  }*/
}
