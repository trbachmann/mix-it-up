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

export const setUserRecipes = (recipes) => ({
  type: 'SET_USER_RECIPES',
  recipes
});

export const addUserRecipe = (recipe) => ({
  type: 'ADD_USER_RECIPE',
  recipe
});

export const updateUserRecipe = (recipe) => ({
  type: 'UPDATE_USER_RECIPE',
  recipe
});

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
});