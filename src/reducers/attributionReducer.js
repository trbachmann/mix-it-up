export const attributionReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ATTRIBUTION':
      return action.attribution;
    default:
      return state;
  }
}