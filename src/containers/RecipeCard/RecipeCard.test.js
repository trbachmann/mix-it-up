import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCard, mapStateToProps, mapDispatchToProps } from './RecipeCard';
import * as data from '../../mockData';
import { deleteRecipeNotes, updateRecipeNotes, setStatus } from '../../actions';

describe('RecipeCard', () => {
  describe('RecipeCard component', () => {

  });

  describe('mapStateToProps', () => {
    it('should return an object with status and desserts', () => {
      const mockState = {
        desserts: data.mockRecipes,
        status: '',
        error: '',
        isLoading: false
      };
      const expected = {
        desserts: data.mockRecipes,
        status: '', 
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should call dispatch with a deleteRecipeNotes action', () => {
      const actionToDispatch = deleteRecipeNotes('Oatmeal-Rasin-Cookies-34576');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteRecipeNotes('Oatmeal-Rasin-Cookies-34576');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with an updateRecipeNotes action', () => {
      const mockId = 'Oatmeal-Rasin-Cookies-34576';
      const mockNotes = 'Increase bakimg time to 15mins'
      const actionToDispatch = updateRecipeNotes(mockId, mockNotes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateRecipeNotes(mockId, mockNotes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a setStatus action', () => {
      const actionToDispatch = setStatus('success');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setStatus('success');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});