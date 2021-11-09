import { Flex, Box, Heading } from 'rebass';
import { useIsFetching } from 'react-query';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Todos from 'components/Todos';
import CreateTodo from 'components/CreateTodo';

const Homepage = () => {
  const isFetching = useIsFetching();

  return (
    <Flex width={[1, 2 / 3]} flexDirection="column" px={20} py={40}>
      <Heading as="h1" fontSize={[5, 6]} color="primary" mb={30}>
        My TODO List
        {isFetching === 1 ? (
          <Box
            data-testid="loader"
            sx={{
              display: 'inline',
              ml: '5px',
              padding: '5px',
            }}
          >
            <FontAwesomeIcon
              icon={faSpinner}
              className="fas fa-spin"
              size="xs"
            />
          </Box>
        ) : null}
      </Heading>
      <CreateTodo data-testid="create-todo-component" />
      <Todos data-testid="todos-component" />
    </Flex>
  );
};

export default Homepage;
