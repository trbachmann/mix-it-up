import { attributionReducer } from '../attributionReducer';
import { mockAttribution } from '../../mockData';
import { setAttribution } from '../../actions';

describe('attributionReducer', () => {
  it('should return the default state', () => {
    const result = attributionReducer(undefined, {});
    expect(result).toEqual({});
  });

  it('should return state with an attribution', () => {
    const expected = mockAttribution;
    const initialState = {};
    const result = attributionReducer(initialState, setAttribution(expected));
  });
});