import { Flex, Box, Text } from 'rebass';
import { normalizeError } from 'utils';
import useGetTodos from 'hooks/useGetTodos';
import Todo from 'components/Todo';

const Todos = () => {
  const onError = (error) => {
    normalizeError(error);
  };

  const { data } = useGetTodos({
    onError,
    refetchOnWindowFocus: false,
  });

  return (
    <Flex flexDirection="column" as="ul" p={0}>
      {data?.map(
        (todo) =>
          !todo.done && (
            <Box
              data-testid="todo-not-done"
              as="li"
              key={todo.id}
              sx={{
                listStyle: 'none',
              }}
            >
              <Todo {...todo} />
            </Box>
          )
      )}
      <hr />
      {data?.map(
        (todo) =>
          todo.done && (
            <Box
              data-testid="todo-done"
              key={todo.id}
              as="li"
              sx={{
                listStyle: 'none',
              }}
            >
              <Todo {...todo} />
            </Box>
          )
      )}

      {data?.length === 0 && (
        <Text data-testid="no-result">Yayy! Nothing to do here!</Text>
      )}
    </Flex>
  );
};

export default Todos;
