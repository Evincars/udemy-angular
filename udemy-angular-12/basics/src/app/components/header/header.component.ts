import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*
  Before routing was used

  @Output() featureSelected = new EventEmitter<string>();*/

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit(): void { }

  /*
  Before routing was used

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
