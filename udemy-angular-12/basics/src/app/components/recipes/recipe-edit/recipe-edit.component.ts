import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
        this.initForm();
      } else {
        this.id = -1;
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    if (this.editMode && confirm('Save changes?')) {
      const editedRecipe: Recipe = new Recipe(
        this.id,
        this.recipeForm.get('name')?.value,
        this.recipeForm.get('description')?.value,
        this.recipeForm.get('imagePath')?.value,
        this.recipeForm.get('ingredients')?.value
      );
      this.recipeService.editRecipe(editedRecipe);
      this.router.navigate(['recipes/detail', this.id]);
    }
  }

  onCancel() {
    if (confirm('Cancel changes?')) {
      this.router.navigate(['recipes/detail', this.id]);
    }
  }

  getControlsOfIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm() {
    if (this.editMode) {
      const formData = this.recipeService.getRecipe(this.id);
      const formIngredients: FormArray = new FormArray([]);

      formData?.ingredients.forEach((o: Ingredient) => {
        formIngredients.push(
          new FormGroup({
            name: new FormControl(o.name, Validators.required),
            amount: new FormControl(o.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      });

      this.recipeForm = new FormGroup({
        name: new FormControl(formData?.name || null, [Validators.required]),
        description: new FormControl(formData?.description || null, [
          Validators.required,
        ]),
        imagePath: new FormControl(formData?.imagePath || null, [
          Validators.required,
        ]),
        ingredients: formIngredients,
      });
    }
  }
}
