import { fetchData } from '../utils/fetchData';
import { toggleLoading, setRecipes, setAttribution, setError } from '../actions';
import { apiId, apiKey } from '../api-key';
import { fetchRecipes } from './fetchRecipes';

export const fetchMatches= () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const url = `http://api.yummly.com/v1/api/recipes?_app_id=${apiId}&_app_key=${apiKey}&q=desserts&requirePictures=true&maxResult=40&start=40`;
      const response = await fetchData(url);
      dispatch(toggleLoading(false));
      const recipes = await dispatch(fetchRecipes(response.matches));
      dispatch(setRecipes(recipes));
      dispatch(setAttribution(response.attribution));
    } catch(error) {
      dispatch(setError(error));
    }
    
  }
}