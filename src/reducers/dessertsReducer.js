export const dessertsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_RECIPES':
      return action.recipes;
    case 'UPDATE_RECIPE_NOTES':
      const updatedRecipes = state.map(recipe => {
        if (recipe.id === action.id) {
          return { ...recipe, notes: action.notes };
        }
        return recipe;
      });
      return updatedRecipes;
    case 'DELETE_RECIPE_NOTES':
      const recipesWithNoteRemoved = state.map(recipe => {
        if (recipe.id === action.id) {
          return { ...recipe, notes: ''};
        }
        return recipe;
      });
      return recipesWithNoteRemoved;
    default:
      return state;
  }
}