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
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(rootReducer);
    ReactDOM.render(<Provider store={store}><BrowserRouter><App {...mockProps}/></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  describe('App component', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallow(<App {...mockProps}/>)
    })
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    afterEach(() => {
      localStorage.removeItem('userRecipes');
    });

    it('should match the snapshot when loading', () => {
      wrapper = shallow(<App {...mockProps} isLoading={true}/>);
      expect(wrapper).toMatchSnapshot();
    });

    describe('componentDidMount', () => {
      it('should call fetchRecipesAndAttribution if nothing in localStorage', () => {
        wrapper.instance().componentDidMount();
        expect(mockProps.fetchRecipesAndAttribution).toHaveBeenCalled();
      });

      it('should call fetchRecipesAndAttribution with savedUserRecipes', () => {
        const expected = data.mockUserRecipeFromStorage
        localStorage.setItem('userRecipes', JSON.stringify(data.mockUserRecipeFromStorage));
        wrapper.instance().componentDidMount();
        expect(mockProps.fetchRecipesAndAttribution).toHaveBeenCalledWith(expected);
      });
    });

    describe('calculateTotalUserRecipes', () => {
      it('should calculate the correct number of user recipes', () => {
        const expected = 1;
        wrapper = shallow(<App {...mockProps} desserts={data.mockRecipesWithUserNotes}/>)
        const result = wrapper.instance().calculateTotalUserRecipes();
        expect(result).toEqual(expected);
      });
    });

    describe('getRecipeRoute', () => {
      it('should return an Error404 if there is no match', () => {
        const mockPath = { params: { id: 'mockRecipe'} };
        const result = wrapper.instance().getRecipeRoute({ match: mockPath });
        const error404Wrapper = shallow(result);
        expect(error404Wrapper.find('.Error404')).toHaveLength(1);
      });

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
