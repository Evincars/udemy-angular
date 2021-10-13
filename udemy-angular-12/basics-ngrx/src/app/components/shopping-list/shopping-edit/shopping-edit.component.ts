import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm?: NgForm;
  private startEditting?: Subscription;
  editMode = false;
  editItemIndex: number = -1;

  /*
  Before NgForms was used
  @ViewChild('nameInput', { static: false }) ingredientName?: ElementRef;
  @ViewChild('amountInput', { static: false }) ingredientAmount?: ElementRef;*/

  /*
  Before Service were used

  @Output('onIngredientAdded') newIngredient = new EventEmitter<Ingredient>();
  */

  errorMessage = '';

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.startEditting = this.shoppingListService.startEditting.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        const editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingListForm?.setValue({
          name: editedItem.name,
          amount: editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.startEditting?.unsubscribe();
  }

  addIngredient() {
    /*
    Before NgForms was used

    const name = this.ingredientName?.nativeElement.value;
    const amount = this.ingredientAmount?.nativeElement.value;

    if (!name || !amount || this.ingredientAmount?.nativeElement.value <= 0) {
      this.errorMessage = 'You have to fill in ingredient name and amount with correct values.';
      return;
    }
    this.errorMessage = '';

    /*
    Before Service were used

    this.newIngredient.emit(new Ingredient(name, amount));*/
    // this.shoppingListService.addIngredient([new Ingredient(name, amount)]);
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.editIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient([newIngredient]);
    }
    form.reset();
    this.editMode = false;
    this.editItemIndex = -1;
  }

  onClear() {
    this.resetForm();
  }

  
  onDelete() {
    if (this.editItemIndex !== -1 && confirm('Do you want to delete the item?')) {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
      this.resetForm();
    }
  }

  private resetForm() {
    this.shoppingListForm?.reset();
    this.editMode = false;
    this.editItemIndex = -1;
  }
}
