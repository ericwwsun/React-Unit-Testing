import axios from 'axios';
import { useMutation } from 'react-query';
import useCreateTodo from './useCreateTodo';

jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('axios');

describe('useCreateTodo hook', () => {
  it('should call the API with correct params/headers', async () => {
    axios.mockResolvedValue({
      data: {},
    });

    const mockParams = { foo: 'bar' };

    useCreateTodo();

    await useMutation.mock.calls[0][0](mockParams);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        data: mockParams,
        headers: expect.objectContaining({
          'X-Custom-Header': 'Custom Value',
        }),
      })
    );
  });
});
