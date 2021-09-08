import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  /* Before routing was used
  @Input() selectedRecipe!: Recipe;*/
  selectedRecipe?: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const snapshotId = parseInt(this.route.snapshot.params['id']);
    // this.selectedRecipe = this.recipeService.getRecipe(snapshotId);
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipe(
        parseInt(params['id'])
      );
    });
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredient(this.selectedRecipe?.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.selectedRecipe?.id);
  }
}
