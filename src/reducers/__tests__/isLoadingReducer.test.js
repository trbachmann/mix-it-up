import { isLoadingReducer } from '../isLoadingReducer';
import { toggleLoading } from '../../actions';

describe('isLoadingReducer', () => {
  it('should return the default state', () => {
    const result = isLoadingReducer(undefined, {});
    expect(result).toEqual(false);
  });

  it('should return the state with a bool', () => {
    const expected = true;
    const initialState = false;
    const result = isLoadingReducer(initialState, toggleLoading(true));
    expect(result).toEqual(expected);
  });
});