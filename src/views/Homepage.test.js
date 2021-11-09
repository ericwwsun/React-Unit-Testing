import { useIsFetching } from 'react-query';

import Homepage from './Homepage';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useIsFetching: jest.fn(),
}));

describe('Homepage Component', () => {
  describe('Global Loader', () => {
    it('should render a loader on data fetching', () => {
      useIsFetching.mockReturnValue(1);
      const { queryByTestId } = renderWrapper(<Homepage />);
      expect(queryByTestId('loader')).toBeDefined();
    });

    it('otherwise should not have a loader', () => {
      useIsFetching.mockReturnValue(0);
      const { queryByTestId } = renderWrapper(<Homepage />);
      expect(queryByTestId('loader')).toBeNull();
    });
  });

  describe('Children Components', () => {
    it('should be able to create a new Todo', () => {
      const { queryByTestId } = renderWrapper(<Homepage />);
      expect(queryByTestId('create-todo-component')).toBeDefined();
    });
    it('should render a todo list', () => {
      const { queryByTestId } = renderWrapper(<Homepage />);
      expect(queryByTestId('todos-component')).toBeDefined();
    });
  });
});
