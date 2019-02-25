import { fetchRecipes } from '../fetchRecipes';
import {
  toggleLoading,
  setError
} from '../../actions';
import * as api from '../../utils/fetchData';
import * as data from '../../mockData';

describe('fetchRecipes', () => {
  const mockDispatch = jest.fn();
  const thunk = fetchRecipes(data.mockResultFromCombineMatches);
  beforeEach(() => {
    api.fetchData = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      name: 'mock recipe'
    }));
  });

  it('should call dispatch with toggleLoading', () => {
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should call fetchData the correct times', async () => {
    await thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalledTimes(2);
  });

  it('should call dispatch with toggleLoading', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should call dispatch with setErro if the response is not okay', async () => {
    api.fetchData = jest.fn(() => { throw new Error('recipe not found')});
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('recipe not found'));
  });
});