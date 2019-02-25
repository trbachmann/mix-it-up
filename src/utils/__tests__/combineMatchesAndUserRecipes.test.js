import { combineMatchesAndUserRecipes } from '../combineMatchesAndUserRecipes';
import * as data from '../../mockData';

describe('combineMatchesAndUserRecipes', () => {
  it('should return matches passed in if there are no userRecipes', () => {
    const result = combineMatchesAndUserRecipes(data.mockYummlyResponse.matches);
    const expected = data.mockYummlyResponse.matches;
    expect(result).toEqual(expected);
  });

  it('should return matches and userRecipes combined if no duplicates', () => {
    const mockUserRecipes = [ data.mockUserRecipeFromStorage ];
    const result = combineMatchesAndUserRecipes(
        data.mockYummlyResponse.matches, 
        mockUserRecipes
    );
    const expected = data.mockResultFromCombineMatches;
    expect(result).toEqual(expected);
  });

  it('should return matches and userRewcipes combined if there are duplicates', 
    () => {
      const mockUserRecipes = [ 
        data.mockUserRecipeFromStorageMatchingYummlyResponseRecipe 
      ];
      const result = combineMatchesAndUserRecipes(
        data.mockYummlyResponse.matches,
        mockUserRecipes
      );
      const expected = data.mockResultWhenCombineWithUserSavedNotes;
      expect(result).toEqual(expected);
  });
});