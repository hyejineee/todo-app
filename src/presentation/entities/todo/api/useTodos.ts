import { useQuery } from '@tanstack/react-query';
import { createGetTodosQueryOptions } from './queries';

export const useTodos = () => {
  const queryResult = useQuery(createGetTodosQueryOptions());
  return queryResult;
};
