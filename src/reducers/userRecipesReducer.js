export const userRecipesReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USER_RECIPES':
      return action.recipes;
    case 'ADD_USER_RECIPE':
      return [...state, action.recipe];
    case 'UPDATE_USER_RECIPE':
      const updateRecipes = state.map(recipe => {
        if(recipe.id === action.recipe.id) {
          return action.recipe;
        }
        return recipe;
      });
      return updateRecipes;
    default:
      return state;
  }
}