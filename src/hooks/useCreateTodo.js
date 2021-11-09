import { useMutation } from 'react-query';
import axios from 'axios';
import config from 'config';

export const createTodo = async (params) => {
  const headers = {
    'X-Custom-Header': 'Custom Value',
  };

  const { data } = await axios({
    method: 'post',
    headers,
    url: `${config.apiDomainURI}/todos`,
    data: params,
  });

  return data;
};

export default function useCreateTodo() {
  return useMutation(createTodo);
}
