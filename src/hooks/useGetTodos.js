import { useQuery } from 'react-query';
import axios from 'axios';
import config from 'config';

const getTodo = async () => {
  const headers = {
    'X-Custom-Header': 'Custome Value',
  };

  const { data } = await axios.get(
    `${config.apiDomainURI}/todos?sortBy=createdAt&order=desc`,
    headers
  );

  return data;
};

const useGetTodos = (options) => {
  return useQuery('get_todos', getTodo, options);
};

export default useGetTodos;
