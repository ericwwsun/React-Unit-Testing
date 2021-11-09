import { useQuery } from 'react-query';
import axios from 'axios';
import config from 'config';
import useGetTodos from './useGetTodos';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn(),
}));

jest.mock('axios');

describe('useGetTodos Hook', () => {
  it('should call useQuery', () => {
    useGetTodos();
    expect(useQuery).toBeCalled();
  });

  it('should be called with default params', () => {
    useGetTodos();
    expect(useQuery.mock.calls[0][0]).toBe('get_todos');
  });

  it('should be called with options', () => {
    const options = {
      foo: 'bar',
    };
    useGetTodos(options);
    expect(useQuery.mock.calls[0][0]).toBe('get_todos');
    expect(useQuery.mock.calls[0][2]).toEqual(options);
  });

  it('should have the custom headers', async () => {
    axios.get.mockResolvedValue({
      data: {},
    });

    const options = {
      foo: 'bar',
    };

    useGetTodos(options);

    await useQuery.mock.calls[0][1]();

    expect(axios.get).toHaveBeenCalledWith(
      `${config.apiDomainURI}/todos?sortBy=createdAt&order=desc`,
      expect.objectContaining({
        'X-Custom-Header': 'Custome Value',
      })
    );
  });
});
