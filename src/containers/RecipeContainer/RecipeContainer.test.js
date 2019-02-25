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
      it.skip('should call populateUserRecipes if /my-recipes', () => {

      });

      it.skip('should call populateRecipesWithOutUsers if /desserts', () => {

      });
    });

    describe('populateUserRecipes', () => {
      it.skip('should return RecipeLinkCards for recipes with notes', () => {

      });
    });

    describe('populateRecipesWithoutUsers', () => {
      it.skip('should returb RecipeLinkCards for recipes without notes', () => {

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