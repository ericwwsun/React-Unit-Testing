import useCreateTodo from 'hooks/useCreateTodo';
import { useQueryClient } from 'react-query';

import { fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateTodo from '.';

jest.mock('hooks/useCreateTodo', () => jest.fn());
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(),
}));

const mutate = jest.fn();
const queryClient = {
  invalidateQueries: jest.fn(),
};

describe('Create Todo Component', () => {
  beforeEach(() => {
    useCreateTodo.mockReturnValue({ mutate });
    useQueryClient.mockReturnValue(queryClient);
  });

  it('should render correctly', () => {
    const { getByTestId } = renderWrapper(<CreateTodo />);
    expect(getByTestId('input-title')).toBeTruthy();
    expect(getByTestId('button-create')).toBeTruthy();
  });

  it('should create a new Todo', () => {
    const { getByTestId } = renderWrapper(<CreateTodo />);
    const inputNode = getByTestId('input-title');
    const buttonNode = getByTestId('button-create');

    fireEvent.change(inputNode, {
      target: {
        value: 'foo bar baz',
      },
    });

    userEvent.click(buttonNode);

    expect(mutate).toHaveBeenCalled();

    act(() => {
      mutate.mock.calls[0][1].onSuccess();
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith('get_todos');
    });
  });

  it('should not create anything when we have no title', () => {
    const { getByTestId } = renderWrapper(<CreateTodo />);
    const buttonNode = getByTestId('button-create');

    userEvent.click(buttonNode);

    expect(mutate).not.toHaveBeenCalled();
  });
});
