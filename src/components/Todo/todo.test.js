import { useQueryClient } from 'react-query';

import { fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Todo from '.';
import useUpdateTodo from 'hooks/useUpdateTodo';

jest.mock('hooks/useUpdateTodo', () => jest.fn());

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(),
}));

describe('Todo Component', () => {
  const queryClient = {
    invalidateQueries: jest.fn(),
  };

  const mutate = jest.fn();

  beforeEach(() => {
    useUpdateTodo.mockReturnValue({ mutate });
    useQueryClient.mockReturnValue(queryClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a todo', () => {
    const todo = {
      id: 1,
      title: 'My first todo',
      done: false,
    };

    const { getByTestId, getByRole } = renderWrapper(<Todo {...todo} />);

    expect(useUpdateTodo).toHaveBeenCalled();
    expect(getByTestId('todo-title')).toBeTruthy();
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('should mutate onCheck', () => {
    const mockTodo = {
      id: 1,
      title: 'My first test',
      done: false,
    };

    const { getByRole } = renderWrapper(<Todo {...mockTodo} />);

    userEvent.click(getByRole('checkbox'));

    expect(mutate).toHaveBeenCalled();

    expect(mutate.mock.calls[0][0]).toEqual({
      id: mockTodo.id,
      done: !mockTodo.done,
    });

    mutate.mock.calls[0][1].onSuccess();

    expect(queryClient.invalidateQueries).toHaveBeenCalled();
  });

  it('should render the Input element onEdit', () => {
    const mockTodo = {
      id: 2,
      title: 'My 2nd test',
      done: false,
    };

    const { getByTestId } = renderWrapper(<Todo {...mockTodo} />);

    expect(getByTestId('button-edit')).toBeTruthy();

    userEvent.click(getByTestId('button-edit'));

    expect(getByTestId('button-save')).toBeTruthy();
    expect(getByTestId('input-title')).toBeTruthy();
  });

  describe('onSave', () => {
    it('should mutate when the title changed', () => {
      const mockTodo = {
        id: 3,
        title: 'My 3rd test',
        done: false,
      };

      const { getByTestId } = renderWrapper(<Todo {...mockTodo} />);

      userEvent.click(getByTestId('button-edit'));

      const inputNode = getByTestId('input-title');

      expect(inputNode.value).toBe(mockTodo.title);

      fireEvent.change(inputNode, { target: { value: 'foo bar' } });

      userEvent.click(getByTestId('button-save'));

      expect(mutate).toHaveBeenCalled();

      act(() => {
        mutate.mock.calls[0][1].onSuccess();
        expect(queryClient.invalidateQueries).toHaveBeenCalled();
      });
    });

    it('should not mutat if the title never changed', () => {
      const mockTodo = {
        id: 4,
        title: 'My 4th test',
        done: false,
      };

      const { getByTestId } = renderWrapper(<Todo {...mockTodo} />);

      userEvent.click(getByTestId('button-edit'));

      const inputNode = getByTestId('input-title');

      expect(inputNode.value).toBe(mockTodo.title);

      userEvent.click(getByTestId('button-save'));

      expect(mutate).not.toHaveBeenCalled();
    });
  });
});
