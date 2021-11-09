import { useState } from 'react';
import { useQueryClient } from 'react-query';
import useCreateTodo from 'hooks/useCreateTodo';

import { Flex, Button } from 'rebass';
import { Input } from '@rebass/forms';

const CreateTodo = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const { mutate } = useCreateTodo();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClick = () => {
    if (title) {
      mutate(
        { title },
        {
          onSuccess: () => {
            setTitle('');
            queryClient.invalidateQueries('get_todos');
          },
        }
      );
    }
  };

  return (
    <Flex mb={40}>
      <Input
        name="input-title"
        onChange={handleChange}
        value={title}
        maxWidth={300}
        mr={10}
      />
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: '#000',
          cursor: 'pointer',
        }}
      >
        Create
      </Button>
    </Flex>
  );
};

export default CreateTodo;
