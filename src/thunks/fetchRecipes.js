import { fetchData } from '../utils/fetchData';
import { toggleLoading, setError } from '../actions';

export const fetchRecipes = (recipes) => {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    const unresolvedRecipes = recipes.map(async (recipe) => {
      try {
        const url = `https://api.yummly.com/v1/api/recipe/${recipe.id}?_app_id=` + process.env.REACT_APP_API_ID + '&_app_key=' + process.env.REACT_APP_API_KEY;
        const data = await fetchData(url);
        const notes = recipe.notes || '';
        const dataWithNotes = {...data, notes }
        dispatch(toggleLoading(false));
        return dataWithNotes;
      } catch(error) {
        dispatch(setError(error.message));
      }
    });
    return Promise.all(unresolvedRecipes);
  }
}
