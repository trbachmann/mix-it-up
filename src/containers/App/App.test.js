import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(rootReducer);
  ReactDOM.render(<Provider store={store}><BrowserRouter><App {...mockProps}/></BrowserRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
