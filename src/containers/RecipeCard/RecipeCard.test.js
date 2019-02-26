import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCard, mapStateToProps, mapDispatchToProps } from './RecipeCard';
import * as data from '../../mockData';
import { deleteRecipeNotes, updateRecipeNotes, setStatus } from '../../actions';
import * as storage from '../../utils/storage';

describe('RecipeCard', () => {

  describe('RecipeCard component', () => {
    storage.setLocalStorage = jest.fn();
    storage.updateLocalStorage = jest.fn();
    storage.removeFromLocalStorage = jest.fn();
    const mockProps = {
      recipe: data.mockRecipe,
      match: { path: '/' },
      status: '',
      deleteRecipeNotes: jest.fn(),
      updateRecipeNotes: jest.fn(),
      setStatus: jest.fn(),
    };

    const mockPropsWithRecipeNotes = {
      recipe: data.mockRecipeWithUserNote,
      match: { path: '/my-recipes/:id' },
      status: '',
      deleteRecipeNotes: jest.fn(),
      updateRecipeNotes: jest.fn(),
      setStatus: jest.fn(),
    }

    let wrapper;
    let wrapperMyRecipes;

    beforeEach(() => {
      wrapper = shallow(<RecipeCard {...mockProps}/>);
      wrapperMyRecipes = shallow(<RecipeCard {...mockPropsWithRecipeNotes}/>);
    });

    afterEach(() => {
      localStorage.removeItem('userRecipes');
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot', () => {
      

      expect(wrapperMyRecipes).toMatchSnapshot();
    });

    describe('componentDidMount', () => {
      it('should set state with notes', () => {
        const expected = data.mockRecipeWithUserNote.notes;
        wrapperMyRecipes.instance().componentDidMount();
        expect(wrapperMyRecipes.state('notes')).toEqual(expected);
      });
    });

    describe('componentWillUnmount', () => {
      it('should call setStatus', () => {
        wrapper.instance().componentWillUnmount();
        expect(mockProps.setStatus).toHaveBeenCalledWith('');
      });
    });

    describe('handleChange', () => {
      it('should set state with notes when a user updates notes', () => {
        expect(wrapper.state('notes')).toEqual('');
        const mockEvent = {
          target: { value: 'Add an extra 1/2 cup of peanut butter' }
        }
        wrapper.find('textarea').simulate('change', mockEvent);
        const expected = 'Add an extra 1/2 cup of peanut butter';
        expect(wrapper.state('notes')).toEqual(expected);
      });
    });

    describe('handleSave', () => {
      it('should call updateRecipeNotes with an id and notes', () => {
        const expectedId = mockProps.recipe.id;
        const expectedNotes = 'Add an extra 1/2 cup of peanut butter';
        wrapper.setState({ notes:  expectedNotes });
        wrapper.find('.RecipeCard--button').simulate('click');
        expect(mockProps.updateRecipeNotes).toHaveBeenCalledWith(expectedId, expectedNotes);
      });

      it('should call setLocalStorage if nothing saved', () => {
        const expectedId = mockProps.recipe.id;
        const expectedNotes = 'Add an extra 1/2 cup of peanut butter';
        wrapper.setState({ notes: expectedNotes });
        wrapper.find('.RecipeCard--button').simulate('click');
        expect(storage.setLocalStorage).toHaveBeenCalledWith(expectedId, expectedNotes);
      });

      it('should call updateLocalStorage is there are already recipes saved', () => {
        localStorage.setItem('userRecipes', JSON.stringify(data.mockUserRecipeFromStorage));
        const expectedId = mockProps.recipe.id;
        const expectedNotes = 'Add an extra 1/2 cup of peanut butter';
        wrapper.setState({ notes: expectedNotes });
        wrapper.find('.RecipeCard--button').simulate('click');
        expect(storage.updateLocalStorage).toHaveBeenCalledWith(expectedId, expectedNotes);
      });


      it('should call setStatus with success', () => {
        const expectedNotes = 'Add an extra 1/2 cup of peanut butter';
        wrapper.setState({ notes: expectedNotes });
        wrapper.find('.RecipeCard--button').simulate('click');
        expect(mockProps.setStatus).toHaveBeenCalledWith('success');
      });
    });

    describe('handleDelete', () => {

      it('should call removeFromLocalStorage', () => {
        wrapper.instance().handleDelete()
        const expected = mockProps.recipe.id;        
        expect(storage.removeFromLocalStorage).toHaveBeenCalledWith(expected);
      });

      it('should call deleteRecipeNotes with the recipe id', () => {
        wrapper.instance().handleDelete()
        const expected = mockProps.recipe.id;
        expect(mockProps.deleteRecipeNotes).toHaveBeenCalledWith(expected);
      });

      it('should set status with success', () => {
        wrapper.instance().handleDelete();
        expect(mockProps.setStatus).toHaveBeenCalledWith('success');
      });
    });
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
        status: ''
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