import { useMutation } from 'react-query';
import axios from 'axios';
import useUpdateTodo from './useUpdateTodo';
import config from 'config';

jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('axios');

describe('useUpdateTodo Hook', () => {
  it('should call useMutation', () => {
    useUpdateTodo();
    expect(useMutation).toHaveBeenCalled();
  });

  it('should be called with custom headers and correct payload', async () => {
    axios.mockResolvedValue({
      data: {
        fooo: 'barr',
      },
    });

    const mockParams = {
      id: 1,
      foo: 'bar',
    };

    useUpdateTodo();

    await useMutation.mock.calls[0][0](mockParams);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'put',
        headers: expect.objectContaining({
          'X-Custom-Header': 'Custom Value',
        }),
        url: `${config.apiDomainURI}/todos/${mockParams.id}`,
        data: expect.objectContaining({
          foo: 'bar',
        }),
      })
    );
  });
});
