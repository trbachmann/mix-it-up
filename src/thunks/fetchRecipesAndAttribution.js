import { fetchData } from '../utils/fetchData';
import { toggleLoading, setRecipes, setAttribution, setError } from '../actions';
import { fetchRecipes } from './fetchRecipes';
import { combineMatchesAndUserRecipes } from '../utils/combineMatchesAndUserRecipes';

export const fetchRecipesAndAttribution = (userRecipes) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const url = 'https://api.yummly.com/v1/api/recipes?_app_id=' + process.env.REACT_APP_API_ID + '&_app_key=' + process.env.REACT_APP_API_KEY + '&q=desserts&requirePictures=true&maxResult=32&start=40';
      const response = await fetchData(url);
      const recipesToFetch = await combineMatchesAndUserRecipes(response.matches, userRecipes);
      const recipes = await dispatch(fetchRecipes(recipesToFetch));
      const updateRecipes = recipes.filter(
        recipe =>
          recipe.id !==
          'No-Bake-Keto-Peanut-Butter-Chocolate-Bars-2537418'
      );
      dispatch(toggleLoading(false));
      dispatch(setRecipes(updateRecipes));
      dispatch(setAttribution(response.attribution));
    } catch(error) {
      dispatch(setError(error.message));
    }
  }
}