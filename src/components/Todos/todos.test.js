import useGetTodos from 'hooks/useGetTodos';
import { normalizeError } from 'utils';
import Todos from '.';

jest.mock('hooks/useGetTodos', () => jest.fn());
jest.mock('utils', () => ({
  normalizeError: jest.fn(),
}));

describe('Todos Component', () => {
  it('should render a todo list', () => {
    useGetTodos.mockImplementation(() => ({
      data: [
        {
          id: 1,
          title: 'Buy Milk',
          done: true,
        },
        {
          id: 2,
          title: 'Run 5K',
          done: false,
        },
        {
          id: 3,
          title: 'Drink 1L water',
          done: false,
        },
      ],
    }));

    const { getByText, queryAllByTestId, queryByTestId } = renderWrapper(
      <Todos />
    );
    expect(useGetTodos).toHaveBeenCalled();
    expect(getByText('Buy Milk')).toBeTruthy();
    expect(queryAllByTestId('todo-done').length).toBe(1);
    expect(queryAllByTestId('todo-not-done').length).toBe(2);
    expect(queryByTestId('no-result')).toBeNull();
  });

  it('should render no result message', () => {
    useGetTodos.mockImplementation(() => ({
      data: [],
    }));
    const { queryByTestId } = renderWrapper(<Todos />);
    expect(useGetTodos).toHaveBeenCalled();
    expect(queryByTestId('no-result')).toBeTruthy();
  });

  describe('onError', () => {
    it('should handle errors', () => {
      const error = {
        foo: 'bar',
      };
      useGetTodos.mockImplementation(() => ({
        data: undefined,
      }));
      renderWrapper(<Todos />);
      useGetTodos.mock.calls[0][0].onError(error);

      expect(normalizeError).toHaveBeenCalledWith(error);
    });
  });
});
