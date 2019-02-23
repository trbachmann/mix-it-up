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

export const updateRecipeNotes = (id, notes) => ({
  type: 'UPDATE_RECIPE_NOTES',
  id,
  notes
});

export const deleteRecipeNotes = (id) => ({
  type: 'DELETE_RECIPE_NOTES',
  id
});

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  status
});