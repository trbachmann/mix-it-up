import { fetchRecipesAndAttribution } from '../fetchRecipesAndAttribution';
import { fetchRecipes } from '../fetchRecipes';
import * as data from '../../mockData';
import * as api from '../../utils/fetchData';
import * as cleaner from '../../utils/combineMatchesAndUserRecipes';

import { 
  toggleLoading, 
  setRecipes, 
  setAttribution, 
  setError 
} from '../../actions';

jest.mock('../fetchRecipes');

describe('fetchRecipesAndAttribution', () => {
  const mockDispatch = jest.fn();
  const thunk = fetchRecipesAndAttribution(data.mockUserRecipeFromStorage);

  beforeEach(() => {
    api.fetchData = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      matches: data.mockYummlyResponse.matches,
      attribution: data.mockYummlyResponse.attribution
    }));
    cleaner.combineMatchesAndUserRecipes = jest.fn(() => data.mockResultFromCombineMatches)
  });
  it('should call dispatch with toggleLoading', () => {
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should call fetchData', () => {
    thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalled();
  });

  it('should call combineMatchesAndUserRecipes with the correct params', async () => {
    const expectedMatches = data.mockYummlyResponse.matches;
    const expectedUserRecipes = data.mockUserRecipeFromStorage;
    await thunk(mockDispatch);
    expect(cleaner.combineMatchesAndUserRecipes).toHaveBeenCalledWith(expectedMatches, expectedUserRecipes);    
  });

  it('should call dispatch with fetchRecipes', async () => {
    const expected = cleaner.combineMatchesAndUserRecipes();
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(fetchRecipes(expected));
  });

  it('should call dispatch with toggleLoading', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should call setAttribution', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setAttribution(data.mockYummlyResponse.attribution));
  });

  it('should dispatch setError if the response is no ok', () => {
    api.fetchData = jest.fn().mockImplementation(() => { throw new Error('error fetching data')});
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('error fetching data'))
  });
});