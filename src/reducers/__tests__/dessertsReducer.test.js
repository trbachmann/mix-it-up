import { dessertsReducer } from '../dessertsReducer';
import { 
  setRecipes, 
  updateRecipeNotes, 
  deleteRecipeNotes
} from '../../actions';
import * as data from '../../mockData';

describe('dessertsReducer', () => {
  it('should return the default state', () => {
    const result = dessertsReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return state with recipes', () => {
    const initialState = [];
    const expected = data.mockRecipes;
    const result = dessertsReducer(initialState, setRecipes(data.mockRecipes));
    expect(result).toEqual(expected);
  });

  it('should return state with updated recipes', () => {
    const initialState = data.mockRecipes;
     const expected = data.mockRecipesWithUserNotes;
     const id = data.mockUserRecipeToChangeNotes.id;
     const notes = data.mockUserRecipeToChangeNotes.notes;
     const result = dessertsReducer(initialState, updateRecipeNotes(id, notes));
     expect(result).toEqual(expected);
  });

  it('should return state with the correct notes deleted', () => {
    const initialState = data.mockRecipesWithUserNotes;
    const expected = data.mockRecipesAfterNoteDelete;
    const id = data.mockUserRecipeToChangeNotes.id;  
    const result = dessertsReducer(initialState, deleteRecipeNotes(id));
    expect(result).toEqual(expected);
  });
});