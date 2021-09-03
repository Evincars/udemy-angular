import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /**
   * So writing null checks like t ? t('my_translation_key') : '' in every place where I want translated text is really frustrating.
   * Instead, I can safely write t!('my_translation_key') without null or undefined checks.
   * In other words, the Non-null assertion operator decreased the possible types from TranslationFunction | undefined to just TranslationFunction.
   */

  /**
   * BETTER DESCRIPTION:
   * Non null assertion is fundamentally different than optional chaining. Non null assertion will not null guard your property chain at run time, it will instead tell the transport that the value preceding the operator will never be null. If it happens to be null, your program will crash.
   * Optional chaining will null check the property before it before continuing down the property chain, essentially guarding that value against being null or undefined.
   */
  @Input('recipeItem') recipe!: Recipe;

  /*
  Moved to service, so we don't need to take a long way through @Output and Event Emitters
  @Output('onSelectedItem') selectedItem = new EventEmitter<void>();
  */

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onItemSelected() {
    // this.selectedItem.emit();

    // not needed, because of routing
    // this.recipeService.recipeSelected.emit(this.recipe);

    // alternatively we can a method for (click) event
    this.router.navigate(['detail', this.recipe.id], {
      relativeTo: this.route,
    });
  }
}
