import { fetchData } from '../utils/fetchData';
import { toggleLoading, setRecipes, setAttribution, setError } from '../actions';
import { apiId, apiKey } from '../api-key';
import { fetchRecipes } from './fetchRecipes';
import { combineMatchesAndUserRecipes } from '../utils/combineMatchesAndUserRecipes';

export const fetchRecipesAndAttribution = (userRecipes) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const url = `http://api.yummly.com/v1/api/recipes?_app_id=${apiId}&_app_key=${apiKey}&q=desserts&requirePictures=true&maxResult=4&start=40`;
      const response = await fetchData(url);
      const recipesToFetch = await combineMatchesAndUserRecipes(response.matches, userRecipes);
      const recipes = await dispatch(fetchRecipes(recipesToFetch));
      dispatch(toggleLoading(false));
      dispatch(setRecipes(recipes));
      dispatch(setAttribution(response.attribution));
    } catch(error) {
      dispatch(setError(error));
    }
  }
}