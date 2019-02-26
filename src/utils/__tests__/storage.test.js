import { setLocalStorage, updateLocalStorage, removeFromLocalStorage } from '../storage';
import * as data from '../../mockData';

describe('storage', () => {
  afterEach(() => {
    localStorage.removeItem('userRecipes');
  });

  describe('setLocalStorage', () => {
    it('should set localStorage with a key of userRecipes and recipes', () => {
      const mockRecipeToSave = data.mockUserRecipeFromStorage;
      const expected = [ mockRecipeToSave ];
      setLocalStorage(mockRecipeToSave.id, mockRecipeToSave.notes);
      const itemInStorage = JSON.parse(localStorage.getItem('userRecipes'));
      expect(itemInStorage).toEqual(expected);
    });
  });

  describe('updateLocalStorage', () => {
    beforeEach(() => {
      localStorage.setItem('userRecipes', JSON.stringify([data.mockUserRecipeFromStorage]));
    });

    it('should update a recipe in storage if it was already saved', () => {
      const expected = [ data.mockUserRecipeToChangeNotes ];
      const id = data.mockUserRecipeToChangeNotes.id;
      const notes = data.mockUserRecipeToChangeNotes.notes;
      const itemInStorage = JSON.parse(localStorage.getItem('userRecipes'));
      updateLocalStorage(id, notes);
      expect(itemInStorage).toEqual(expected);
    });

    it('should add a recipe to storage if it was not already save', () => {
      const mockNewRecipe = { id: 'Fudgy-Brownies', notes: 'Mix fudge in right before baking' };
      const expected = [ data.mockUserRecipeFromStorage, mockNewRecipe ];
      updateLocalStorage(mockNewRecipe.id, mockNewRecipe.notes);
      const itemInStorage = JSON.parse(localStorage.getItem('userRecipes'));
      expect(itemInStorage).toEqual(expected);
    });
  });

  describe('removeFromLocalStorage', () => {
    it('should remove the correct recipe from localStorage', () => {
      localStorage.setItem('userRecipes', JSON.stringify(data.mockRecipesInStorage));
      const recipeIdToRemove = "Toasted-marshmallow-cookies-and-cream-milkshake-335047";
      const expected = data.mockRecipesInStorageAfterDelete;
      removeFromLocalStorage(recipeIdToRemove);
      const itemInStorage = JSON.parse(localStorage.getItem('userRecipes'));
      expect(itemInStorage).toEqual(expected);      
    });
  });
});