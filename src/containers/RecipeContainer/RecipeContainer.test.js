import React from 'react';
import { shallow } from 'enzyme';
import { RecipeContainer, mapStateToProps } from './RecipeContainer';
import * as data from '../../mockData';

describe('RecipeContainer', () => {
  describe('RecipeContainer component', () => {
    let wrapper;
    const mockMatch = { path: '/' };
    
    beforeEach(() => {
      wrapper = shallow(<RecipeContainer desserts={data.mockRecipesWithUserNotes} match={mockMatch}/>)
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the path is /my-recipes', () => {
      const mockMatchWithMyRecipes = { path: '/my-recipes' }
      wrapper = shallow(
        <RecipeContainer 
          desserts={data.mockRecipesWithUserNotes} 
          match={mockMatchWithMyRecipes } 
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    describe('getRecipesToDisplay', () => {
      it('should call populateRecipesWithOutUsers if /', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'populateRecipesWithoutUsers');
        wrapper.instance().getRecipesToDisplay();
        expect(instance.populateRecipesWithoutUsers).toHaveBeenCalled();
      });

      it('should call populateRecipesWithOutUsers if /desserts', () => {
        const mockMatchWithDesserts = { path: '/desserts' }
        wrapper = shallow(
          <RecipeContainer
            desserts={data.mockRecipesWithUserNotes}
            match={mockMatchWithDesserts}
          />
        );
        const instance = wrapper.instance();
        jest.spyOn(instance, 'populateRecipesWithoutUsers');
        wrapper.instance().getRecipesToDisplay();
        expect(instance.populateRecipesWithoutUsers).toHaveBeenCalled();
      });

      it('should call populateUserRecipes is /my-recipes', () => {
        const mockMatchWithMyRecipes = { path: '/my-recipes' }
        wrapper = shallow(
          <RecipeContainer
            desserts={data.mockRecipesWithUserNotes}
            match={mockMatchWithMyRecipes}
          />
        );
        const instance = wrapper.instance();
        jest.spyOn(instance, 'populateUserRecipes');
        wrapper.instance().getRecipesToDisplay();
        expect(instance.populateUserRecipes).toHaveBeenCalled();
      });
    });
  });
  
  describe('mapStateToPrpos', () => {
    it('should return an object with desserts', () => {
      const mockState = {
        desserts: data.mockRecipes,
        error: '',
        status: '',
        isLoading: false,
        attribution: data.mockAttribution
      }
      const expected = {
        desserts: data.mockRecipes
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});