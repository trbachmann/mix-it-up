import { errorReducer } from '../errorReducer';
import { setError } from '../../actions';

describe('errorReducer', () => {
  it('should return the default state', () => {
    const result = errorReducer(undefined, {});
    expect(result).toEqual('');
  });

  it('should return the state and an error', () => {
    const expected = 'Error fetching data';
    const initialState = '';
    const result = errorReducer(initialState, setError('Error fetching data'));
    expect(result).toEqual(expected);
  })
});