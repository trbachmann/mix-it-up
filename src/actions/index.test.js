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
  
  describe('setUserRecipes', () => {
    it('should return an object with a type of SET_USER_RECIES and recipes', () => {
      const expected = {
        type: 'SET_USER_RECIPES',
        recipes: data.mockUserRecipes
      };
      const result = actions.setUserRecipes(data.mockUserRecipes);
      expect(result).toEqual(expected);
    });
  });

  describe('addUserRecipe', () => {
    it('should return an object with a type of ADD_USER_RECIPE and a recipe', () => {
      const expected = {
        type: 'ADD_USER_RECIPE',
        recipe: data.mockRecipe
      };
      const result = actions.addUserRecipe(data.mockRecipe);
      expect(result).toEqual(expected);
    });
  });

  describe('updateUserRecipe', () => {
    it('should return an object with a type of UPDATE_USER_RECIPE and a recipe', () => {
      const expected = {
        type: 'UPDATE_USER_RECIPE',
        recipe: data.mockRecipe
      };
      const result = actions.updateUserRecipe(data.mockRecipe);
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