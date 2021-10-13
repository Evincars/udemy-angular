import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from './recipe.service';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    // to store all recipes (rewrite all previous data) - only for FireBase
    // request to FireBase is not send, until we'll subscribe it!!
    this.http
      .put(
        'https://udemy-angular-12-1182a-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    // This is also possible, to subscribe() and immedietely unsubscribe(),
    // but, we'll use take(...) operator from RxJS
    // this.authService.userSub.subscribe().unsubscribe();

    // take ONE parameter and UNsubscribe(), I don't care about future Users
    // then in exhaustMap() -> WAIT for user, then unsubscribe and inside exhaustMap()
    // return a NEW Observable which will REPLACE THE FIRST Observable and return
    // a new HTTP Observable
    // previously used map() and tap() will be appended the the existing pipe

    /*
    Logic of exhaustMap() moved to INTERCEPTOR

    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user) => {
        // in other APIs, token is appended in header,
        // with Firebase, we'll use queryString
        return this.http.get<Recipe[]>(
          'https://udemy-angular-12-1182a-default-rtdb.firebaseio.com/recipes.json',
          { params: new HttpParams().set('auth', user?.token || '') }
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          // JS map() for Array, not RxJS
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.message);
      })
    );*/

    return this.http
      .get<Recipe[]>(
        'https://udemy-angular-12-1182a-default-rtdb.firebaseio.com/recipes.json',
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            // JS map() for Array, not RxJS
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err.message);
        })
      );
  }
}
