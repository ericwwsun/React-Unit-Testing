import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { Flex } from 'rebass';
import { Label, Checkbox, Input } from '@rebass/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

import useUpdateTodo from 'hooks/useUpdateTodo';

const Todo = ({ id, title, done }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const { mutate } = useUpdateTodo();

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  const onTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const onCheck = () => {
    mutate(
      {
        id,
        done: !done,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('get_todos');
        },
      }
    );
  };

  const onSave = () => {
    if (!newTitle || newTitle === title) {
      setIsEditing(!isEditing);
      return;
    }

    mutate(
      {
        id,
        title: newTitle,
      },
      {
        onSuccess: () => {
          setIsEditing(!isEditing);
          queryClient.invalidateQueries('todos');
        },
      }
    );
  };

  return (
    <Flex>
      {isEditing ? (
        <Input
          name="input-title"
          defaultValue={title}
          onChange={onTitleChange}
        />
      ) : (
        <Label
          fontSize={[3]}
          mb="1"
          sx={{
            cursor: 'pointer',
          }}
        >
          <Checkbox
            name={`todo-done`}
            defaultChecked={done}
            onChange={onCheck}
          />
          {title}
        </Label>
      )}
      <Flex
        p={1}
        sx={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <FontAwesomeIcon icon={faSave} onClick={onSave} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faEdit} onClick={onEdit} size="lg" />
        )}
      </Flex>
    </Flex>
  );
};

export default Todo;
