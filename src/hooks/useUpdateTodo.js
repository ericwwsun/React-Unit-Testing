import { useMutation } from 'react-query';
import axios from 'axios';
import config from 'config';

export const updateTodo = async ({ id, ...params }) => {
  const headers = {
    'X-Custom-Header': 'Custom Value',
  };

  const { data } = await axios({
    method: 'put',
    headers,
    url: `${config.apiDomainURI}/todos/${id}`,
    data: params,
  });

  return data;
};

export default function useUpdateTodo() {
  return useMutation(updateTodo);
}
