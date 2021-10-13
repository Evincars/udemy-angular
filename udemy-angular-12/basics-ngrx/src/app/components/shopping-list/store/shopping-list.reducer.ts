import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

interface State {
  ingredients?: Ingredient[];
}

const initialState: State = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomato', 3)],
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // never touch the existing state, it MUST BE inmutable
      // it's fine to return a new object and preserve the old one
      return {
        ...state, // it's a good practise to ALWAYS copy the old state
        // ingredients: [
        //   {...state.ingredients}, // old state
        //   action?.payload,
        // ],
        payload: action.payload
      };

    default:
      return {
        ...state,
        payload: action.payload
      };
  }
}
