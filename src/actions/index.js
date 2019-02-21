export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setRecipes = (recipes) => ({
  type: 'SET_RECIPES',
  recipes
});

export const setAttribution = (attribution) => ({
  type: 'SET_ATTRIBUTION',
  attribution
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});