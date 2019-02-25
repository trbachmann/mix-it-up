import { fetchData } from '../fetchData';
import * as data from '../../mockData';

describe('fetchData', () => {
  const mockUrl = 'http://www.mockyummly.com/api/v1/recipes';

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data.mockYummlyResponse)
    }));
  });

  it('should call fetch with the correct url', () => {
    const expected = mockUrl;
    fetchData(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should return recipes if the response is ok', async () => {
    const expected = data.mockYummlyResponse;
    const result = await fetchData(mockUrl);
    expect(result).toEqual(expected);
  });

  it('should throw an error if the response is not okay', async() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      status: 404,
      message: 'No matching recipes found'
    }));
    const expected = Error('No matching recipes found');
    await expect(fetchData(mockUrl)).rejects.toEqual(expected);
  });
});