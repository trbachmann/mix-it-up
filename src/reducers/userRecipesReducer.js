export const userRecipesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_RECIPE':
      return [...state, action.recipe];
    case 'UPDATE_RECIPE':
      const updateRecipes = state.map(recipe => {
        if(recipe.id === action.recipe.id) {
          return action.recipe
        }
        return recipe
      });
      return updateRecipes;
    default:
      return state;
  }
}