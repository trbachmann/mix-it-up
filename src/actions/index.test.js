import * as actions from './index';
import * as data from '../mockData';

describe('actions', () => {
  describe('toggleLoading', () => {
    it('should return an object with a type of TOGGLE_LOADING and a bool', () => {
      const expected = {
        type: 'TOGGLE_LOADING',
        bool: true
      }
      const result = actions.toggleLoading(true);
      expect(result).toEqual(expected);
    });
  });

  describe('setAttribution', () => {
    it('should return an object with a type of SET_ATTRIBUTION and an attribution', () => {
      const expected = {
        type: 'SET_ATTRIBUTION',
        attribution: data.mockAttribution
      };
      const result = actions.setAttribution(data.mockAttribution);
      expect(result).toEqual(expected);
    });
  });

  describe('setError', () => {
    it('should return an object with a type of SET_ERROR and a message', () => {
      const expected = {
        type: 'SET_ERROR',
        message: 'Error fetching'
      };
      const result = actions.setError('Error fetching');
      expect(result).toEqual(expected);
    });
  });

  describe('setRecipes', () => {
    it('should return an object with a type of SET_RECIPES and recipes', () => {
      const expected = {
        type: 'SET_RECIPES',
        recipes: data.mockRecipes
      };
      const result = actions.setRecipes(data.mockRecipes);
      expect(result).toEqual(expected);
    });
  });

  describe('updateRecipeNotes', () => {
    it('should return an object with a type of UPDATE_RECIPE_NOTES an id and notes', () => {
      const expected = {
        type: 'UPDATE_RECIPE_NOTES',
        id: data.mockRecipe.id,
        notes: data.mockRecipe.notes
      };
      const result = actions.updateRecipeNotes(data.mockRecipe.id, data.mockRecipe.notes);
      expect(result).toEqual(expected);
    });
  });
  
  describe('deleteRecipeNotes', () => {
    it('should return an object with a type of DELETE_RECIPE_NOTES and an id', () => {
      const expected = {
        type: 'DELETE_RECIPE_NOTES',
        id: data.mockRecipe.id
      };
      const result = actions.deleteRecipeNotes(data.mockRecipe.id);
      expect(result).toEqual(expected);
    });
  });

  describe('setStatus', () => {
    it('should return an object with a type of SET_STATUS and a status', () => {
      const expected = {
        type: 'SET_STATUS',
        status: 'success'
      };
      const result = actions.setStatus('success');
      expect(result).toEqual(expected);
    });
  });
});