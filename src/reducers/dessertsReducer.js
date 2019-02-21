export const dessertsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_RECIPES':
      return action.recipes;
    default:
      return state;
  }
}