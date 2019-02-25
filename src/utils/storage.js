export const setLocalStorage = (id, notes) => {
  const recipes = JSON.stringify([{ id, notes }]);
  localStorage.setItem('userRecipes', recipes);
};

export const updateLocalStorage = (id, notes) => {
  const savedRecipes = JSON.parse(localStorage.getItem('userRecipes'));
  const found = savedRecipes.find(savedRecipe => savedRecipe.id === id);
  let updatedRecipes;
  if (found) {
    updatedRecipes = savedRecipes.map(savedRecipe => {
      if (savedRecipe.id === id) {
        savedRecipe.notes = notes;
      }
      return savedRecipe
    });
  } else {
    updatedRecipes = [...savedRecipes, { id, notes }];
  }
  localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
};

export const removeFromLocalStorage = (id) => {
  const savedRecipes = JSON.parse(localStorage.getItem('userRecipes'));
  const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
  localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
};