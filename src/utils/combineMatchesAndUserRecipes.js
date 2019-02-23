export const combineMatchesAndUserRecipes = (matches, userRecipes) => {
  if (!userRecipes) {
    return matches
  }
  
  let uniqueUserRecipes = [];
  userRecipes.forEach(userRecipe => {
    let found = false;
    matches.forEach(match => {
      if (match.id === userRecipe.id) {
        found = true;
        match.notes = userRecipe.notes;
      }
    });

    if (!found) {
      uniqueUserRecipes.push(userRecipe);
    }
  });
  return [...matches, ...uniqueUserRecipes];
}