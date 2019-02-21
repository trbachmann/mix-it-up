import { fetchData } from '../utils/fetchData';
import { apiId, apiKey } from '../api-key';
import { toggleLoading, setError } from '../actions';

export const fetchRecipes = (recipes) => {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    const unresolvedRecipes = recipes.map(async (recipe) => {
      try {
        const url = `http://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=${apiId}&_app_key=${apiKey}`;
        const data = await fetchData(url);
        dispatch(toggleLoading(false));
        return data;
      } catch(error) {
        dispatch(setError(error));
      }
    });
    return Promise.all(unresolvedRecipes);
  }
}
