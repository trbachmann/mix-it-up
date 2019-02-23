import { fetchRecipes } from './fetchRecipes';
import { toggleLoading, setError, setUserRecipes } from '../actions'; 


export const fetchUserRecipes = (savedRecipes) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const recipeData = await dispatch(fetchRecipes(savedRecipes));
      const userRecipes = await recipeData.map(recipe => {
        savedRecipes.forEach(savedRecipe => {
          if (savedRecipe.id === recipe.id) {
            recipe.notes = savedRecipe.notes;
          }
        });
        return recipe;
      });
      dispatch(toggleLoading(false));
      dispatch(setUserRecipes(userRecipes));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}