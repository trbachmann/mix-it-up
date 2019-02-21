import { combineReducers } from 'redux';
import { dessertsReducer } from './dessertsReducer';
import { userRecipesReducer } from './userRecipesReducer';
import { errorReducer } from './errorReducer';
import { statusReducer } from './statusReducer';
import { isLoadingReducer } from './isLoadingReducer';

export const rootReducer = combineReducers({
  desserts: dessertsReducer,
  userRecipes: userRecipesReducer,
  error: errorReducer,
  status: statusReducer,
  isLoading: isLoadingReducer
});