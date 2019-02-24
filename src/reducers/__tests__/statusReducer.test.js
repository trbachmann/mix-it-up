import { statusReducer} from '../statusReducer';
import { setStatus } from '../../actions';

describe('statusReducer', () => {
  it('should return the default state', () => {
    const result = statusReducer(undefined, {});
    expect(result).toEqual('');
  });

  it('should return the state with a status', () => {
    const expected = 'success';
    const initialState = '';
    const result = statusReducer(initialState, setStatus('success'));
    expect(result).toEqual(expected);
  });
});