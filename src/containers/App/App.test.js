import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/';
import { shallow } from 'enzyme';
import * as data from '../../mockData';
import { fetchRecipesAndAttribution } from '../../thunks/fetchRecipesAndAttribution';

const mockProps = {
  desserts: data.mockRecipes,
  userRecipes: [],
  error: '',
  isLoading: false,
  attribution: {},
  fetchRecipesAndAttribution: jest.fn(() => true),
}

jest.mock('../../thunks/fetchRecipesAndAttribution.js');

describe('App', () => {
  describe('App component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      const store = createStore(rootReducer);
      ReactDOM.render(<Provider store={store}><BrowserRouter><App {...mockProps}/></BrowserRouter></Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with desserts, error, isLoadind and attribution', () => {
      const mockState = {
        desserts: data.mockRecipes,
        error: '',
        status: '',
        isLoading: false,
        attribution: data.mockAttribution,
      };
      const expected = {
        desserts: data.mockRecipes,
        error: '',
        isLoading: false,
        attribution: data.mockAttribution,
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a fetchRecipesAndAttribution', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchRecipesAndAttribution([ data.mockUserRecipeFromStorage ]);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchRecipesAndAttribution([ data.mockUserRecipeFromStorage ]);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
