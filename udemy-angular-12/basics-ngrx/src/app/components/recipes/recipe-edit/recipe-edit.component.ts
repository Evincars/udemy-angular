import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number = -1;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params?.id) {
        this.id = +params['id'];
        this.editMode = true;
      } else {
        this.id = -1;
        this.editMode = false;
      }
      this.initForm();
    });
  }

  onSubmit() {
    this.recipeForm.value['id'] = this.id;

    if (this.editMode && confirm('Save changes?')) {
      // this.recipeForm.value ... has the same Object structure as Recipe
      this.recipeService.editRecipe(this.recipeForm.value);
      this.router.navigate(['recipes/detail', this.id]);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['recipes']);
    }
  }

  onCancel() {
    if (confirm('Cancel changes?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  getControlsOfIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.createIngredientControl()
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    if (this.editMode) {
      this.editRecipeForm();
    } else {
      this.addRecipeForm();
    }
  }

  private addRecipeForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([this.createIngredientControl()]),
    });
  }

  private editRecipeForm() {
    const data = this.recipeService.getRecipe(this.id);
    const formIngredients = this.createIngredientsControl(data);

    this.recipeForm = new FormGroup({
      // id: this.id,
      name: new FormControl(data?.name, [Validators.required]),
      description: new FormControl(data?.description, [Validators.required]),
      imagePath: new FormControl(data?.imagePath, [Validators.required]),
      ingredients: formIngredients,
    });
  }

  private createIngredientsControl(formData: Recipe | undefined) {
    const formIngredients: FormArray = new FormArray([]);

    formData?.ingredients.forEach((o: Ingredient) => {
      formIngredients.push(this.createIngredientControl(o));
    });
    return formIngredients;
  }

  private createIngredientControl(ingredient?: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient?.name || null, Validators.required),
      amount: new FormControl(ingredient?.amount || null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
