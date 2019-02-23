import { combineReducers } from 'redux';
import { dessertsReducer } from './dessertsReducer';
import { errorReducer } from './errorReducer';
import { statusReducer } from './statusReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { attributionReducer } from './attributionReducer';

export const rootReducer = combineReducers({
  desserts: dessertsReducer,
  error: errorReducer,
  status: statusReducer,
  isLoading: isLoadingReducer,
  attribution: attributionReducer
});